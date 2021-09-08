export type DevicePosition = typeof startingDevicePosition;
export const startingDevicePosition = {
  x: 0,
  y: 0,
  z: 0,
  w: 0,
};

export const positionToBuffer = (position: DevicePosition) =>
  new Float32Array([
    position.x,
    position.y,
    position.z,
    position.w,
  ]);

export const writeBufferToPosition = (
  buffer: ArrayBuffer,
  position: DevicePosition
) => {
  const array = new Float32Array(buffer);
  position.x = array[0];
  position.y = array[1];
  position.z = array[2];
  position.w = array[3];
};
