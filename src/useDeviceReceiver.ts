import useJsonWebsocket, { JsonSocket } from "./useJsonWebsocket";

import { useEffect, useMemo, useState } from "react";
import { writeBufferToPosition } from "./devicePosition";
import { jsonSocketToSignalInterface } from "./webrtc/webrtcShared";
import useDataChannelListener from "./webrtc/useDataChannelListener";

const startingPlayerData = { x: 0, y: 0, z: 0, w: 0 };

export default function useDeviceReceiver(id: string) {
  const { status, socket } = useJsonWebsocket(
    //@ts-ignore
    `${import.meta.env.VITE_SIGNAL_URL}/${id}`
  );
  const signalingInterface = useMemo(
    () => (socket ? jsonSocketToSignalInterface(socket, id) : null),
    [socket, id]
  );

  const connections = useDataChannelListener<ArrayBuffer>(signalingInterface);

  const devicePositions = useMemo(
    () =>
      Object.entries(connections).reduce((acc, [key, connection]) => {
        const position = { ...startingPlayerData };
        connection.onMessage(({ data }) => {
          const array = new Float32Array(data);
          position.x = array[0];
          position.y = array[1];
          position.z = array[2];
          position.w = array[3];
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
