import React, { lazy, Suspense } from "react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function App() {
  const hash = window.location.hash.substring(1) || uuid();
  useEffect(() => {
    window.location.hash = hash;
  }, [hash]);
  const id = hash.substring(hash.lastIndexOf("/") + 1);
  const Inner = hash.startsWith("device") ? Device : Display;
  return (
    <Suspense fallback="">
      <Inner id={id} />
    </Suspense>
  );
}

const devicePreload = import("./Device");
const displayPreload = import("./Display");

const Device = lazy(() => devicePreload);
const Display = lazy(() => displayPreload);
