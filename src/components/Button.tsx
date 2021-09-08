import { styled } from "goober";
import { bgColor, primaryColor } from "../constants";

export default styled("button")`
  all: unset;
  padding: 1em 1.2em;
  border-radius: 0.5em;
  user-select: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8em;
  color: ${bgColor};
  background-color: ${primaryColor};
  appearance: none;
  margin: 0;
`;
