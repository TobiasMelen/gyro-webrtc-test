import React, { ComponentProps } from "react";
import { css } from "goober";
import useJsonWebsocket from "../useJsonWebsocket";
import useDeviceReceiver from "../useDeviceReceiver";
import Message from "./Message";
import Qr from "./Qr";
import DeviceRender from "../three-fiber/DeviceRender";

export default function Display({ id }: { id: string }) {
  
  const [status, devices] = useDeviceReceiver(id);
  if (status === "error") {
    return <Message>Can't connect to signaling server</Message>;
  }
  if (Object.keys(devices).length === 0) {
    const qrUrl = `${
      window.location.origin + window.location.pathname
    }#device/${id}`;
    return (
      <>
        {/* <div style={{ height: "1.5em" }} /> */}
        <Message>Test your phone gyro</Message>
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
