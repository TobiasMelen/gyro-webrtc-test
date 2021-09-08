import React, { useEffect, useState } from "react";
import useDeviceSender from "../useDeviceSender";
import Button from "./Button";
import Message from "./Message";
function mod(x: number, m: number) {
  return ((x % m) + m) % m;
}
const normalizeAngle = (degree: number) => {
  return mod(degree + 180, 360) - 180;
};

function offsetAngle(
  pos: DeviceOrientationEvent,
  zeroPos: DeviceOrientationEvent,
  value: "alpha" | "beta" | "gamma"
) {
  const angle = (pos[value] ?? 0) + (zeroPos[value] ?? 0);
  return normalizeAngle(angle);
}

export default function Device({ id }: { id: string }) {
  const [status, send] = useDeviceSender(id);
  const [hasPermissions, setHasPermissions] = useState(false);
  useEffect(() => {
    let hasSetPermissions = false;
    let zeroPos: DeviceOrientationEvent | null = null;
    const listener = (pos: DeviceOrientationEvent) => {
      if (!hasSetPermissions) {
        //Not trusting React to have zero overhead here.
        setHasPermissions(true);
        hasSetPermissions = true;
      }
      zeroPos = zeroPos ?? pos;
      send?.(pos.alpha ?? 0, pos.beta ?? 0, pos.gamma ?? 0);
    };
    addEventListener("deviceorientation", listener);
    return () => removeEventListener("deviceorientation", listener);
  }, [send]);

  if (hasPermissions === false) {
    return <PromptPermission />;
  }
  switch (status) {
    case "connected":
      return <Message>Your phone is now visualized on the main screen</Message>;
    case "connecting":
      return <Message>Connecting</Message>;
    case "error":
      return (
        <Message>
          Could not connect, make sure phone is connected to the same Wifi as
          the computer
        </Message>
      );
    case "empty":
      return <Message>No one seems to be here anymore 😢</Message>;
    default:
      return null;
  }
}

const PromptPermission = () => (
  <>
    <Message>To use the phone gyro, we must first get your permission.</Message>
    <Button
      onClick={() =>
        DeviceOrientationEvent.requestPermission().then(
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
