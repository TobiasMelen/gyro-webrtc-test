import { useEffect, useState } from "react";
import {
  DataChannelDataTypes,
  DataChannelHooks,
  SignalingInterface,
} from "./webrtcShared";

export default function useDataChannelListener<TData extends DataChannelDataTypes>(
  signalingInterface: SignalingInterface | null
) {
  const [connections, setConnections] = useState<{
    [id: string]: DataChannelHooks<TData>;
  }>({});

  useEffect(() => {
    if (signalingInterface == null) {
      return;
    }

    const unbindSignalListener = signalingInterface.onSignalingMessage(
      (from, data) => {
        if (!("type" in data) || data.type !== "offer") {
          return;
        }
        const clientConnection = new RTCPeerConnection({
          iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
        });

        clientConnection.onicecandidate = (event) =>
          event.candidate != null &&
          signalingInterface.sendSignalingMessage(
            from,
            event.candidate.toJSON()
          );
        const unbindPeerSignaling = signalingInterface.onSignalingMessage(
          (candidateFrom, data) =>
            candidateFrom === from &&
            "candidate" in data &&
            clientConnection.addIceCandidate(data)
        );
        clientConnection.onconnectionstatechange = () => {
          const state = clientConnection.connectionState;
          if (state == "disconnected") {
            unbindPeerSignaling();
            setConnections((connections) => {
              if (from in connections && connections[from] === channelHooks) {
                const newConnections = { ...connections };
                delete newConnections[from];
                return newConnections;
              }
              return connections;
            });
          }
        };

        let channelHooks: DataChannelHooks<TData>;
        clientConnection.ondatachannel = ({ channel }: RTCDataChannelEvent) => {
          channelHooks = {
            onMessage: (listener: (ev: MessageEvent<TData>) => any) => {
              channel.addEventListener("message", listener);
              return () => channel.removeEventListener("message", listener);
            },
            sendMessage: channel.send as (message: TData) => void,
          };
          setConnections((devices) => ({
            ...devices,
            [from]: channelHooks,
          }));
        };

        clientConnection
          .setRemoteDescription(new RTCSessionDescription(data))
          .then(async () => {
            const localDescription = await clientConnection.createAnswer();
            await clientConnection.setLocalDescription(localDescription);
            signalingInterface.sendSignalingMessage(from, localDescription);
          });
      }
    );
    return unbindSignalListener;
  }, [signalingInterface]);

  return connections;
}
