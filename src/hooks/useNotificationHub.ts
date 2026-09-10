import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { SIGNALR_HUB_URL, AUTH_TOKEN_STORAGE_KEY } from "@/utils/constants";

interface NotificationHubEvents {
  onOutbid?: (payload: { auctionId: string; newHighestBid: number }) => void;
  onNewBid?: (payload: { auctionId: string; newBidAmount: number; bidderName: string }) => void;
  onAuctionWon?: (payload: { auctionId: string; winningAmount: number }) => void;
  onAuctionClosed?: (payload: { auctionId: string }) => void;
}

// Site-wide notification connection — unlike useAuctionHub (which only
// connects while viewing one specific auction's detail page), this connects
// as soon as the user is logged in and stays connected everywhere, so a
// buyer browsing the homepage still gets told the instant they're outbid,
// and the navbar bell can show a live unread badge. The backend already
// identifies the connection by JWT (accessTokenFactory), so no per-auction
// group join is needed here — OutBid/AuctionWon/AuctionClosed/NewBid are
// pushed directly to this user's connection regardless of which auction
// they concern.
export function useNotificationHub(enabled: boolean, events: NotificationHubEvents) {
  const [isConnected, setIsConnected] = useState(false);
  const eventsRef = useRef(events);
  eventsRef.current = events;

  useEffect(() => {
    if (!enabled) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALR_HUB_URL, {
        accessTokenFactory: () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ?? "",
      })
      .withAutomaticReconnect()
      .build();

    connection.on("OutBid", (payload: { auctionId: string; newHighestBid: number }) =>
      eventsRef.current.onOutbid?.(payload)
    );
    connection.on("NewBid", (payload: { auctionId: string; newBidAmount: number; bidderName: string }) =>
      eventsRef.current.onNewBid?.(payload)
    );
    connection.on("AuctionWon", (payload: { auctionId: string; winningAmount: number }) =>
      eventsRef.current.onAuctionWon?.(payload)
    );
    connection.on("AuctionClosed", (payload: { auctionId: string }) =>
      eventsRef.current.onAuctionClosed?.(payload)
    );

    connection
      .start()
      .then(() => setIsConnected(true))
      .catch((err) => console.error("Global notification SignalR connection failed:", err));

    connection.onreconnected(() => setIsConnected(true));
    connection.onreconnecting(() => setIsConnected(false));
    connection.onclose(() => setIsConnected(false));

    return () => {
      connection.stop();
      setIsConnected(false);
    };
  }, [enabled]);

  return { isConnected };
}