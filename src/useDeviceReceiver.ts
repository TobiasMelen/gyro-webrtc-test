import useJsonWebsocket, { JsonSocket } from "./useJsonWebsocket";

import { useEffect, useMemo, useState } from "react";
import { writeBufferToPosition } from "./devicePosition";
import { jsonSocketToSignalInterface } from "./webrtc/webrtcShared";
import useDataChannelListener from "./webrtc/useDataChannelListener";

const startingPlayerData = { alpha: 0, beta: 0, gamma: 0, x: 0, y: 0, z: 0 };

export default function useDeviceReceiver(id: string) {
  const signalingSocket = useJsonWebsocket(
    //@ts-ignore
    `${import.meta.env.VITE_SIGNAL_URL}/${id}`
  );
  // const [devices, setDevices] = useState<{
  //   [id: string]: typeof startingPlayerData;
  // }>({});

  const signalingInterface = useMemo(
    () =>
      signalingSocket.socket
        ? jsonSocketToSignalInterface(signalingSocket.socket, id)
        : null,
    [signalingSocket.socket, id]
  );

  const connections = useDataChannelListener<ArrayBuffer>(signalingInterface);

  const devicePositions = useMemo(
    () =>
      Object.entries(connections).reduce((acc, [key, connection]) => {
        const position = { ...startingPlayerData };
        connection.onMessage(({ data }) => {
          const array = new Float32Array(data);
          position.alpha = array[0];
          position.beta = array[1];
          position.gamma = array[2];
          // position.x = array[3];
          // position.y = array[4];
          // position.z = array[5];
        });
        acc[key] = position;
        return acc;
      }, {} as Record<string, typeof startingPlayerData>),
    [connections]
  );

  return [status, devicePositions] as const;
}
