import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { MathUtils, Quaternion } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { DevicePosition } from "../devicePosition";
import { RoundedBox } from "./RoundedBox";

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
    mesh.setRotationFromQuaternion(
      new Quaternion(data.x, data.y, data.z, data.w)
    );
  });
  return (
    <RoundedBox ref={ref} position={[0, 0, -2]} args={[2.5, 5, .15]}>
      <meshPhongMaterial color={"hotpink"} shininess={100} />
    </RoundedBox>
  );
};
