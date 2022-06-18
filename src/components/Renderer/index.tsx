import React, { useMemo } from "react";
import modules from '../accessories'
import { Node } from '../../interface'
interface IProps {
  node: Node,
}

const Renderer = ({ node }: IProps) => {
  const { style, children, substyle, size, position = {}, editableStatus, nodes } = node;
  const newStyle = useMemo(() => {
    return {
      display: editableStatus?.isHide ? "none" : style?.display || 'block',
      ...style,
      ...position,
      // minHeight: size?.height,
      // minWidth: size?.width,
      ...size,
    }
  }, [editableStatus?.isHide, style, size, position])

  // TODO: splice style

  return (
    React.createElement(modules.get(node.type), {
      ...node,
      children,
      style: newStyle,
    })
  )
}

export default Renderer;