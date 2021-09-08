export type DevicePosition = typeof startingDevicePosition;
export const startingDevicePosition = {
  alpha: 0,
  beta: 0,
  gamma: 0,
  x: 0,
  y: 0,
  z: 0,
};

export const positionToBuffer = (position: DevicePosition) =>
  new Float32Array([
    position.alpha,
    position.beta,
    position.gamma,
    position.x,
    position.y,
    position.z,
  ]);

export const writeBufferToPosition = (
  buffer: ArrayBuffer,
  position: DevicePosition
) => {
  const array = new Float32Array(buffer);
  position.alpha = array[0];
  position.beta = array[1];
  position.gamma = array[2];
  position.x = array[3];
  position.y = array[4];
  position.z = array[5];
};
