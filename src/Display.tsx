import React, { ComponentProps } from "react";
import { css } from "goober";
import useWsRelay from "./useWsRelay";
import useDeviceReceiver from "./useDeviceReceiver";
import Message from "./Message";
import Qr from "./Qr";
import DeviceRender from "./DeviceRender";

const mainStyle = css`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = (props: ComponentProps<"main">) => (
  <main {...props} className={mainStyle} />
);

export default function Display({ id }: { id: string }) {
  const wsConnection = useWsRelay(
    //@ts-ignore
    `${import.meta.env.VITE_SIGNAL_URL}/${id}`
  );
  const devices = useDeviceReceiver(wsConnection.socket);
  if (wsConnection.status === "failed") {
    return (
      <Wrap>
        <Message>Can't connect to signaling server</Message>
      </Wrap>
    );
  }
  if (Object.keys(devices).length === 0) {
    return (
      <Wrap>
        <Qr>{`${
          window.location.origin + window.location.pathname
        }#device/${id}`}</Qr>
      </Wrap>
    );
  }
  return <DeviceRender devices={devices} />;
}
