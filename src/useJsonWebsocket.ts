import { useState, useEffect, useMemo } from "react";

export type JsonSocket = NonNullable<
  ReturnType<typeof useJsonWebsocket>["socket"]
>;

export default function useJsonWebsocket(url?: string) {
  const [socket, setSocket] = useState<WebSocket>();
  const [connectionFailed, setConnectionFailed] = useState(false);

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

  useEffect(() => {
    if (!url || socket != null) {
      return;
    }
    const s = new WebSocket(url);
    s.onclose = () => {
      //If we just had an open socket, retry once by resetting socket value.
      if (socket != null) {
        setSocket(undefined);
      } else {
        setConnectionFailed(true);
      }
    };
    s.onopen = () => {
      setSocket(s);
    };
    s.onerror = () => s.close();
  }, [url, socket]);

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
