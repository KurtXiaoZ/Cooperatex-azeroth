import Renderer from "components/Renderer";
import { CSSProperties } from "react";
import './index.less'
import React from "react";

interface IProps {
  style?: CSSProperties;
  children: any
}

const SwitcherItem = (props: IProps) => {
  const { style, children = [], } = props;

  return (
    <div className="accessory-element-switcherItem">
      {children}
    </div>
  )
}

export default SwitcherItem;