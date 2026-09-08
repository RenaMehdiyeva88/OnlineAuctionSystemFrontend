import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { SIGNALR_HUB_URL, AUTH_TOKEN_STORAGE_KEY } from "@/utils/constants";

interface AuctionHubEvents {
  onOutbid?: (payload: { auctionId: string; newHighestBid: number }) => void;
  onNewBid?: (payload: { auctionId: string; newBidAmount: number; bidderName: string }) => void;
  onAuctionWon?: (payload: { auctionId: string; winningAmount: number }) => void;
  onAuctionClosed?: (payload: { auctionId: string }) => void;
}

// F3/F4/F5: subscribes to the real backend SignalR hub (NotificationHub,
// mapped at /hubs/notifications). No fake timers or simulated data.
//
// Events:
// - OutBid: Sent to losing bidders when outbid
// - NewBid: Sent to seller when new bid is placed on their auction
// - AuctionWon: Sent to winner when auction closes
// - AuctionClosed: Sent to seller when auction closes
export function useAuctionHub(auctionId: string | undefined, events: AuctionHubEvents) {
  const [isConnected, setIsConnected] = useState(false);
  const eventsRef = useRef(events);
  eventsRef.current = events;

  useEffect(() => {
    if (!auctionId) return;

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
      .catch((err) => console.error("SignalR connection failed:", err));

    connection.onreconnected(() => setIsConnected(true));
    connection.onreconnecting(() => setIsConnected(false));
    connection.onclose(() => setIsConnected(false));

    return () => {
      connection.stop();
      setIsConnected(false);
    };
  }, [auctionId]);

  return { isConnected };
}