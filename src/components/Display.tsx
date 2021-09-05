import React, { ComponentProps } from "react";
import { css } from "goober";
import useWsRelay from "../useWsRelay";
import useDeviceReceiver from "../useDeviceReceiver";
import Message from "./Message";
import Qr from "./Qr";
import DeviceRender from "../three-fiber/DeviceRender";

export default function Display({ id }: { id: string }) {
  const wsConnection = useWsRelay(
    //@ts-ignore
    `${import.meta.env.VITE_SIGNAL_URL}/${id}`
  );
  const devices = useDeviceReceiver(wsConnection.socket);
  if (wsConnection.status === "failed") {
    return <Message>Can't connect to signaling server</Message>;
  }
  if (Object.keys(devices).length === 0) {
    const qrUrl = `${
      window.location.origin + window.location.pathname
    }#device/${id}`;
    return (
      <>
        <div style={{ height: "1.5em" }} />
        <Qr>{qrUrl}</Qr>
        <Message bob>
          ↑<br />
          Scan QR with phone camera
        </Message>
      </>
    );
  }
  return <DeviceRender devices={devices} />;
}
