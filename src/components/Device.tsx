import React, { useEffect, useState } from "react";
import { Euler } from "three/src/math/Euler";
import { degToRad } from "three/src/math/MathUtils";
import { Quaternion } from "three/src/math/Quaternion";
import useDeviceSender from "../useDeviceSender";
import Button from "./Button";
import Message from "./Message";

var degtorad = Math.PI / 180;
function getQuaternion(alpha: number | null, beta: number | null, gamma: number | null) {
  var _x = beta ? beta * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos(_x / 2);
  var cY = Math.cos(_y / 2);
  var cZ = Math.cos(_z / 2);
  var sX = Math.sin(_x / 2);
  var sY = Math.sin(_y / 2);
  var sZ = Math.sin(_z / 2);

  //
  // ZXY quaternion construction.
  //

  var w = cX * cY * cZ - sX * sY * sZ;
  var x = sX * cY * cZ - cX * sY * sZ;
  var y = cX * sY * cZ + sX * cY * sZ;
  var z = cX * cY * sZ + sX * sY * cZ;

  return new Quaternion(x, y, z, w);
}

export default function Device({ id }: { id: string }) {
  const [status, send] = useDeviceSender(id);
  const [hasPermissions, setHasPermissions] = useState(false);
  useEffect(() => {
    let hasSetPermissions = false;
    let zeroQuaternion: Quaternion;
    const listener = (pos: DeviceOrientationEvent) => {
      if (!hasSetPermissions) {
        //Not trusting React to have zero overhead here.
        setHasPermissions(true);
        hasSetPermissions = true;
      }
      const quarternion = getQuaternion(pos.alpha, pos.beta, pos.gamma);
      // zeroQuaternion ??= quarternion.clone().invert();
      // quarternion.multiply(zeroQuaternion);
      send?.(quarternion.x, quarternion.y, quarternion.z, quarternion.w);
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
