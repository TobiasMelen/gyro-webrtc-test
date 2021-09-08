import { createGlobalStyles as createGlobalStyle } from "goober/global";
import React, { lazy, Suspense } from "react";
import MainContainer from "./MainContainer";

const GlobalStyle = createGlobalStyle`
body {
  font-family: "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 700;
  background-color: pink;
  color: hotpink;
  margin: 0;
  font-size: 6vmin;
}
`;

export default function App() {
  const hashedId = window.location.hash.substring(1);
  return (
    <Suspense fallback="">
      <GlobalStyle />
      {hashedId ? (
        <MainContainer>
          <Device id={hashedId} />
        </MainContainer>
      ) : (
        <MainContainer fullHeight>
          <Display />
        </MainContainer>
      )}
    </Suspense>
  );
}

const devicePreload = import("./Device");
const displayPreload = import("./Display");

const Device = lazy(() => devicePreload);
const Display = lazy(() => displayPreload);
