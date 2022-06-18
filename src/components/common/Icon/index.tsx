import React, { useState, useMemo, CSSProperties } from 'react';
import cls from 'classnames';
import SVG from 'SVG';
import './index.less';

declare type defaultImg = any;
declare type switchedImg = any;
export interface IconProps {
  name?: defaultImg;
  key?: string;
  style?: CSSProperties;
  imgs?: any[];
  onClick?: (e: any) => any
  iconStyle?: CSSProperties
  // [string: any]: any
}

function Icon({ name, style, imgs, onClick, iconStyle, ...restProps }: IconProps) {
  const [clicked, setClicked] = useState(false);

  const src = useMemo(() => {
    if (imgs) return imgs[0];
    if (imgs && clicked) return imgs[1];
    return name;
  }, [name, clicked, imgs])

  const handleClick = (e: any) => {
    onClick && onClick(e)
  }


  return (
    <span
      className={cls('icon')}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      style={style}
      onClick={handleClick}
      {...restProps}
    >
      <SVG name={name} style={iconStyle} />
    </span>
  );
}

export default Icon;