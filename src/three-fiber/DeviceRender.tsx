import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { MathUtils, Quaternion } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { primaryColor } from "../constants";
import { DevicePosition } from "../devicePosition";
import { RoundedBox } from "./RoundedBox";

var degtorad = Math.PI / 180;
function getQuaternion({ alpha, beta, gamma }: DevicePosition) {
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

export default function DeviceRender({
  devices,
}: {
  devices: Record<string, DevicePosition>;
}) {
  return (
    <Canvas>
      <pointLight position={[0, 7, 15]} />
      {Object.entries(devices).map(([key, data]) => (
        <Device key={key} data={data} />
      ))}
    </Canvas>
  );
}

const Device = ({ data }: { data: DevicePosition }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const mesh = ref.current;
    if (mesh == null) {
      return;
    }
    mesh.setRotationFromQuaternion(getQuaternion(data));
  });
  return (
    <RoundedBox ref={ref} position={[0, 0, -2]} args={[2.5, 5, 0.15]}>
      <meshPhongMaterial color={primaryColor} shininess={100} />
    </RoundedBox>
  );
};
