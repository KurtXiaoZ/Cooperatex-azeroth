import { CSSProperties } from "react";
import { Node } from 'interface';
import './index.less'

export interface ImageProps {
  src?: string;
  alt?: string
}

const Image = ({ style, originProps = {}, size }: Node) => {
  const { src, alt } = originProps

  return (
    <div style={style} className="accessory-element-image">
      {src && <img src={src} alt={alt} style={size} />}
    </div>
  )
}

export default Image;
