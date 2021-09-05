import React, { lazy, Suspense } from "react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import MainContainer from "./MainContainer";

export default function App() {
  const hash = window.location.hash.substring(1) || uuid();
  useEffect(() => {
    window.location.hash = hash;
  }, [hash]);
  const id = hash.substring(hash.lastIndexOf("/") + 1);
  const isDeviceView = hash.startsWith("device");
  const Inner = isDeviceView ? Device : Display;
  return (
    <Suspense fallback="">
      <MainContainer fullHeight={!isDeviceView}>
        <Inner id={id} />
      </MainContainer>
    </Suspense>
  );
}

const devicePreload = import("./Device");
const displayPreload = import("./Display");

const Device = lazy(() => devicePreload);
const Display = lazy(() => displayPreload);
