import { css } from "goober";
import React from "react";
import { ComponentProps } from "react";

const mainStyle = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  max-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export default function MainContainer({
  fullHeight,
  ...props
}: { fullHeight?: boolean } & ComponentProps<"main">) {
  return (
    <main
      {...props}
      className={mainStyle}
      style={fullHeight ? { height: "100vh" } : {}}
    />
  );
}
