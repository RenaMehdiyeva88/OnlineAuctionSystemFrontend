import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { SIGNALR_HUB_URL, AUTH_TOKEN_STORAGE_KEY } from "@/utils/constants";

interface AuctionHubEvents {
  onOutbid?: (payload: { auctionId: string; newHighestBid: number }) => void;
  onNewBid?: (payload: { auctionId: string; newBidAmount: number; bidderName: string }) => void;
  onAuctionWon?: (payload: { auctionId: string; winningAmount: number }) => void;
  onAuctionClosed?: (payload: { auctionId: string }) => void;
  onBidPlaced?: (payload: { auctionId: string; newAmount: number; bidderName: string }) => void;
}

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
    connection.on(
      "BidPlaced",
      (payload: { auctionId: string; newAmount: number; bidderName: string }) =>
        eventsRef.current.onBidPlaced?.(payload)
    );

    connection
      .start()
      .then(() => {
        setIsConnected(true);
        return connection.invoke("JoinAuctionGroup", auctionId);
      })
      .catch((err) => console.error("SignalR connection failed:", err));

    connection.onreconnected(() => {
      setIsConnected(true);
      connection.invoke("JoinAuctionGroup", auctionId).catch((err) => console.error("Rejoin failed:", err));
    });
    connection.onreconnecting(() => setIsConnected(false));
    connection.onclose(() => setIsConnected(false));

    return () => {
      connection.invoke("LeaveAuctionGroup", auctionId).catch(() => {});
      connection.stop();
      setIsConnected(false);
    };
  }, [auctionId]);

  return { isConnected };
}