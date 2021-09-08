import { css, keyframes } from "goober";
import React, { ComponentProps } from "react";

type Props = {
  bob?: boolean;
};

const bobFrames = keyframes`
 from {
   transform: translateY(-.1em);
 }
 to {
   transform: translateY(.1em);
 }
`;

const style = (bob?: boolean) => css`
  font-size: 1em;
  text-align: center;
  font-weight: bold;
  user-select: none;
  margin: 1em auto;
  max-width: 90vw;
  ${bob
    ? `
        animation: ${bobFrames} 0.75s ease-in-out alternate-reverse infinite;
      `
    : ""};
`;

export default function Message({
  bob,
  ...props
}: ComponentProps<"h1"> & Props) {
  return <h1 {...props} className={style(bob)} />;
}
