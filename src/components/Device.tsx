import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import Message from "./Message";
import { startingPlayerData } from "../playerData";
import useDeviceSender from "../useDeviceSender";
import Button from "./Button";

export default function Device({ id }: { id: string }) {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [send, status] = useDeviceSender(id);
  const position = useMemo(() => ({ ...startingPlayerData }), [id]);
  useEffect(() => {
    if (status !== "connected" || send == null) {
      return;
    }
    let hasSetPermissions = false;
    const listener = ({ rotationRate, interval }: DeviceMotionEvent) => {
      setHasPermissions(true);
      const secondInterval = interval / 100;
      position.alpha += (rotationRate?.alpha ?? 0) * secondInterval;
      position.beta += (rotationRate?.beta ?? 0) * secondInterval;
      position.gamma += (rotationRate?.gamma ?? 0) * secondInterval;
      send(position);
    };
    addEventListener("devicemotion", listener);
    return () =>
      //@ts-ignore ????
      removeEventListener("deviceMotion", listener);
  }, [status]);

  if (hasPermissions === false) {
    return (
      <>
        <Message>
          To use the phone gyro, we must first get your permission.
        </Message>
        <Button
          onClick={() =>
            DeviceMotionEvent.requestPermission().then(
              (res) =>
                res !== "granted" &&
                alert(
                  "Did not get permissions. Browser app must be restarted to try again."
                )
            )
          }
        >
          OK, ask away!
        </Button>
      </>
    );
  }
  return <Message>Your phone is now tracked on other screen</Message>;
}
