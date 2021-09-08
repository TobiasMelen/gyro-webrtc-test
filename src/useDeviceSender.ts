import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { DevicePosition, positionToBuffer } from "./devicePosition";
import useJsonWebsocket from "./useJsonWebsocket";
import useLocalStorageState from "./useLocalStorageState";
import useDataChannelConnector from "./webrtc/useDataChannelConnector";
import { jsonSocketToSignalInterface } from "./webrtc/webrtcShared";

export default function useDeviceSender(receiverId: string) {
  const [deviceId] = useLocalStorageState("connection-id", uuid());

  const signalingSocket = useJsonWebsocket(
    //@ts-ignore
    `${import.meta.env.VITE_SIGNAL_URL}/${deviceId}`
  );

  const signalingInterface = useMemo(
    () =>
      signalingSocket.socket
        ? jsonSocketToSignalInterface(signalingSocket.socket, deviceId)
        : undefined,
    [signalingSocket.socket, deviceId]
  );

  const rtcConnection = useDataChannelConnector(receiverId, signalingInterface);

  return useMemo(
    () =>
      [
        signalingSocket.status !== "connected"
          ? signalingSocket.status
          : rtcConnection.status,
        rtcConnection.status === "connected"
          ? (...params: number[]) => {
              rtcConnection.sendMessage(new Float32Array(params));
            }
          : null,
      ] as const,
    [signalingSocket.status, rtcConnection]
  );
}
