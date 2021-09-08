import { useState, useEffect, useMemo } from "react";

export type JsonSocket = NonNullable<
  ReturnType<typeof useJsonWebsocket>["socket"]
>;

export default function useJsonWebsocket(url?: string) {
  const [socket, setSocket] = useState<WebSocket>();
  const [connectionFailed, setConnectionFailed] = useState(false);

  useEffect(() => {
    if (!url || socket != null) {
      return;
    }
    const s = new WebSocket(url);
    s.onclose = () => {
      setConnectionFailed(true);
    };
    s.onopen = () => {
      setSocket(s);
    };
    s.onerror = () => s.close();
  }, [url, socket]);

  //Clear socket on url changes
  useEffect(() => {
    setSocket((socket) => {
      if (socket) {
        socket.onclose = null;
        socket?.close();
      }
      return undefined;
    });
  }, [url]);

  //When socket has opened, set next disconnect to retry instead of error.
  useEffect(() => {
    socket && (socket.onclose = () => setSocket(undefined));
  }, [socket]);

  const jsonSocket = useMemo(
    () =>
      socket
        ? {
            addListener(listener: (data: any) => void) {
              const fn = ({ data }: MessageEvent<any>) =>
                listener(JSON.parse(data));
              socket.addEventListener("message", fn);
              return () => socket.removeEventListener("message", fn);
            },
            send(data: any) {
              socket.send(JSON.stringify(data));
            },
          }
        : null,
    [socket]
  );

  return jsonSocket == null
    ? {
        status: connectionFailed ? ("error" as const) : ("connecting" as const),
      }
    : { status: "connected" as const, socket: jsonSocket };
}
