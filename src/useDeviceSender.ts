import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { PlayerData } from "./playerData";
import useWsRelay from "./useWsRelay";

type Props = {
  lobbyName: string;
};

type ConnectionStatus = "connected" | "connecting" | "empty" | "error";

export default function useDeviceSender(receiverId: string) {
  const deviceId = useMemo(() => localStorage["connection-id"] ?? uuid(), []);
  useEffect(() => localStorage.setItem("connection-id", deviceId));

  const signalingSocket = useWsRelay(
    //@ts-ignore
    `${import.meta.env.VITE_SIGNAL_URL}/${deviceId}`
  );

  const [lobbyMessageChannel, setLobbyMessageChannel] =
    useState<(data: PlayerData) => void>();
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");

  useEffect(() => {
    if (signalingSocket.status !== "connected" || lobbyMessageChannel != null) {
      return;
    }

    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });

    const channel = peerConnection.createDataChannel("Client data channel", {
      maxRetransmits: 1,
      ordered: false,
    });
    channel.onopen = () => {
      setLobbyMessageChannel(
        () => (data: PlayerData) => channel.send(JSON.stringify(data))
      );
      setConnectionStatus("connected")
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate != null) {
        signalingSocket.socket.send({
          to: receiverId,
          from: deviceId,
          data: event.candidate.toJSON(),
        });
      }
    };
    peerConnection.oniceconnectionstatechange = () => {
      const disconnect = () => {
        setConnectionStatus("error");
      };
      switch (peerConnection.iceConnectionState) {
        case "disconnected":
        case "failed": {
          disconnect();
          break;
        }
      }
    };
    let timeout: number;
    signalingSocket.socket.addListener(async ({ data }) => {
      clearTimeout(timeout);
      if (data.type === "answer") {
        await peerConnection.setRemoteDescription(data);
      } else if ("candidate" in data) {
        await peerConnection.addIceCandidate(data);
      }
    });
    peerConnection.createOffer().then(async (offer) => {
      timeout = window.setTimeout(() => {
        setConnectionStatus((connectionStatus) =>
          connectionStatus !== "error" ? "empty" : "error"
        );
      }, 1000);
      await peerConnection.setLocalDescription(offer);
      signalingSocket.socket.send({
        data: offer,
        to: receiverId,
        from: deviceId,
      });
    });
  }, [lobbyMessageChannel, receiverId, signalingSocket]);

  return [
    lobbyMessageChannel,
    signalingSocket.status === "connected"
      ? connectionStatus
      : signalingSocket.socket,
  ] as const;
}
