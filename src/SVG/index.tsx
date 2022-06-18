import React, { CSSProperties } from "react";

const importAll = (requireContext: any) => requireContext.keys().map(requireContext);
importAll(require?.context("./svgs", true, /\.svg$/));

interface IProps {
  name: string,
  id?: string,
  style?: CSSProperties,
  className?: string,
  spin?: boolean
}
const SVG = (props: IProps) => (
  <svg
    id={props.id}
    style={props.style}
    className={`_svg ${props.className || ''}`}
  >
    <use style={{
      width: 17,
      height: 17
    }} xlinkHref={"#" + props.name} />
  </svg>
);

export default SVG;
