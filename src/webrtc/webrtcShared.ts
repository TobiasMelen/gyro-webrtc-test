import type { JsonSocket } from "../useJsonWebsocket";

type Unbind = () => void;
export type DataChannelDataTypes =
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | string;

export type SignalingInterface = {
  onSignalingMessage(
    listener: (
      from: string,
      data: RTCIceCandidateInit | RTCSessionDescriptionInit
    ) => void
  ): Unbind;
  sendSignalingMessage(
    to: string,
    data: RTCIceCandidateInit | RTCSessionDescriptionInit
  ): void;
};

export type Connection<TData extends DataChannelDataTypes> =
  | ({
      status: "connected";
    } & DataChannelHooks<TData>)
  | { status: "connecting" }
  | { status: "empty" | "error" };

export type DataChannelHooks<TData extends DataChannelDataTypes> = {
  onMessage(listener: (ev: MessageEvent<TData>) => any): Unbind;
  sendMessage(message: TData): void;
};

export function jsonSocketToSignalInterface(
  socket: JsonSocket,
  sender: string
): SignalingInterface {
  return {
    onSignalingMessage: (listener) =>
      socket.addListener(
        (msg) => "from" in msg && "data" in msg && listener(msg.from, msg.data)
      ),
    sendSignalingMessage: (to, data) => socket.send({ to, from: sender, data }),
  };
}
