import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import Message from "./Message";
import { startingPlayerData } from "./playerData";
import useDeviceSender from "./useDeviceSender";

export default function Device({ id }: { id: string }) {
  const [devicePermissions, setDevicePermission] = useState(false);
  const [send, status] = useDeviceSender(id);
  const position = useMemo(() => ({ ...startingPlayerData }), [id]);
  useEffect(() => {
    if (status !== "connected" || send == null) {
      return;
    }
    const listener = ({ rotationRate, interval }: DeviceMotionEvent) => {
      const secondInterval = interval / 100;
      position.alpha += (rotationRate?.alpha ?? 0) * secondInterval;
      position.beta += (rotationRate?.beta ?? 0) * secondInterval;
      position.gamma += (rotationRate?.gamma ?? 0) * secondInterval;
      send(position);
    };
    addEventListener("devicemotion", listener);
    return () =>
      //@ts-ignore
      removeEventListener("deviceMotion", listener);
  }, [status]);
  return (
    <main>
      <button
        onClick={() =>
          DeviceMotionEvent.requestPermission().then((res) =>
            setDevicePermission(res === "granted")
          )
        }
      >
        Start
      </button>
    </main>
  );
}
