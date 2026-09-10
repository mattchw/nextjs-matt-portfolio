import React from "react";
import {
  Html,
  Css,
  Javascript,
  Nodejs,
  Golang,
  Typescript,
} from "./Icons";

export interface Props {
  name: string;
  size?: number;
  color?: string;
}

const Skill: React.FC<Props> = ({ name, size = 40, color }) => {
  switch (name) {
    case "Html":
      return <Html size={size} color={color} />;
    case "Css":
      return <Css size={size} color={color} />;
    case "Javascript":
      return <Javascript size={size} color={color} />;
    case "Typescript":
      return <Typescript size={size} color={color} />;
    case "Nodejs":
      return <Nodejs size={size} color={color} />;
    case "Golang":
      return <Golang size={size} color={color} />;
    default:
      return null;
  }
};

export default Skill;
