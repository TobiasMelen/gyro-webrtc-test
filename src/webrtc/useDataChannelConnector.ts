import { useEffect, useState } from "react";
import {
  Connection,
  DataChannelDataTypes,
  SignalingInterface
} from "./webrtcShared";

const defaultConfig = {
  dataChannelName: "Data channel",
  rtcConfig: {
    iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
  } as RTCConfiguration,
  reconnectTries: 1,
};

export default function useDataChannelConnector<
  TData extends DataChannelDataTypes = any
>(
  connectTo: string,
  signalingInterface?: SignalingInterface,
  config?: typeof defaultConfig
) {
  config = { ...defaultConfig, ...config };

  const [connection, setConnection] = useState<Connection<TData>>({
    status: "connecting",
  });

  useEffect(() => {
    if (connection.status != "connecting" || signalingInterface == null) {
      return;
    }

    const peerConnection = new RTCPeerConnection(config!.rtcConfig);

    const channel = peerConnection.createDataChannel(config!.dataChannelName, {
      maxRetransmits: 1,
      ordered: false,
    });
    channel.onopen = () => {
      setConnection({
        status: "connected",
        onMessage: (listener: (ev: MessageEvent<TData>) => any) => {
          channel.addEventListener("message", listener);
          return () => channel.removeEventListener("message", listener);
        },
        sendMessage: (data: TData) => {
          channel.send(data as any);
        }
      });
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate != null) {
        signalingInterface.sendSignalingMessage(
          connectTo,
          event.candidate.toJSON()
        );
      }
    };
    peerConnection.oniceconnectionstatechange = () => {
      switch (peerConnection.iceConnectionState) {
        case "disconnected":
        case "failed": {
          //Retry once if an open data channel exists
          setConnection((connection) => ({
            status: connection.status === "connected" ? "connecting" : "error",
          }));
          break;
        }
      }
    };
    let timeout: number;
    signalingInterface.onSignalingMessage(async (_from, data) => {
      clearTimeout(timeout);
      if ("type" in data) {
        await peerConnection.setRemoteDescription(data);
      } else if ("candidate" in data) {
        await peerConnection.addIceCandidate(data);
      }
    });
    peerConnection.createOffer().then(async (offer) => {
      timeout = window.setTimeout(() => {
        setConnection(({ status: prevStatus }) => ({
          status: prevStatus !== "error" ? "empty" : "error",
        }));
      }, 5000);
      await peerConnection.setLocalDescription(offer);
      signalingInterface.sendSignalingMessage(connectTo, offer);
    });
    //return () => peerConnection.close();
  }, [connection.status, signalingInterface, connectTo]);

  return connection;
}