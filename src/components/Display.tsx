import React, { ComponentProps } from "react";
import { css } from "goober";
import useJsonWebsocket from "../useJsonWebsocket";
import useDeviceReceiver from "../useDeviceReceiver";
import Message from "./Message";
import Qr from "./Qr";
import DeviceRender from "../three-fiber/DeviceRender";
import useLocalStorageState from "../useLocalStorageState";
import { v4 as uuid } from "uuid";

export default function Display() {
  const [id] = useLocalStorageState("display-id", uuid());
  const [status, devices] = useDeviceReceiver(id);
  if (status === "error") {
    return (
      <Message>
        💔
        <br />
        Can't connect to signaling server
      </Message>
    );
  }
  if (Object.keys(devices).length === 0) {
    const qrUrl = `${window.location.origin + window.location.pathname}#${id}`;
    return (
      <>
        <div style={{ height: "2em" }} />
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
