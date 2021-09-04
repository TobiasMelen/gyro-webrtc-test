import { css } from "goober";
import React, { ComponentProps } from "react";

const style = css`
  font-size: 5em;
  text-align: center;
  font-weight: 900;
  user-select: none;
`;

export default function Message(props: ComponentProps<"h1">) {
  return <h1 {...props} className={style} />;
}
