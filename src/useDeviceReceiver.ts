import { JsonSocket } from "./useWsRelay";

import { useEffect, useState } from "react";
import { PlayerData } from "./playerData";

const startingPlayerData = { alpha: 0, beta: 0, gamma: 0, x: 0, y: 0, z: 0 };

export default function useDeviceReceiver(socket?: JsonSocket) {
  const [devices, setDevices] = useState<{
    [id: string]: typeof startingPlayerData;
  }>({});

  useEffect(() => {
    if (socket == null) {
      return;
    }

    const unbindSocketListener = socket.addListener(
      async ({
        from: offerFrom,
        data,
      }: {
        from: string;
        data: { type: "offer" } & RTCSessionDescription;
      }) => {
        if (data.type !== "offer" || offerFrom == null) {
          return;
        }
        const clientConnection = new RTCPeerConnection({
          iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
        });

        clientConnection.onicecandidate = (event) =>
          event.candidate != null &&
          socket.send({
            to: offerFrom,
            data: event.candidate.toJSON(),
          });
        const unbindPeerSignaling = socket.addListener(
          ({ from: candidateFrom, data }) =>
            candidateFrom === offerFrom &&
            "candidate" in data &&
            clientConnection.addIceCandidate(data)
        );
        const closeConnection = () => {
          unbindPeerSignaling?.();
          // setDevices((devices) => {
          //   if (offerFrom in devices) {
          //     const newDevices = { ...devices };
          //     delete newDevices[offerFrom];
          //     return newDevices;
          //   }
          //   return devices;
          // });
        };
        clientConnection.ondatachannel = ({ channel }: RTCDataChannelEvent) => {
          //channel.onclose = closeConnection;
          const data = { ...startingPlayerData };
          channel.onmessage = (ev) => {
           const evData = JSON.parse(ev.data) as PlayerData;
           data.alpha = evData.alpha;
           data.beta = evData.beta;
           data.gamma = evData.gamma;
           data.x = evData.x;
           data.y = evData.y;
           data.z = evData.z;
          }
          setDevices((devices) => ({
            ...devices,
            [offerFrom]: data,
          }));
        };
        clientConnection.onconnectionstatechange = () => {
          const state = clientConnection.connectionState;
          if (state == "disconnected") {
            closeConnection();
          }
        };
        await clientConnection.setRemoteDescription(
          new RTCSessionDescription(data)
        );
        const localDescription = await clientConnection.createAnswer();
        await clientConnection.setLocalDescription(localDescription);
        socket.send({ data: localDescription, to: offerFrom });
      }
    );
    return unbindSocketListener;
  }, [socket]);

  return devices;
}
