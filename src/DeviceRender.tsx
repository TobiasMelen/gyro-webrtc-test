import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { PlayerData } from "./playerData";

export default function DeviceRender({
  devices,
}: {
  devices: Record<string, PlayerData>;
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

const Device = ({ data }: { data: PlayerData }) => {
  const ref = useRef<THREE.Mesh>();
  useFrame(() => {
    const mesh = ref.current;
    if (mesh == null) {
      return;
    }
    mesh.rotation.x = data.alpha;
    mesh.rotation.y = data.beta;
    mesh.rotation.z = data.gamma;
  });
  return (
    <mesh ref={ref}  position={[0, 0, -1.5]}>
      <boxGeometry args={[2.8, 5, 0.1]}/>
      <meshPhongMaterial color="hotpink" shininess={60} />
    </mesh>
  );
};
