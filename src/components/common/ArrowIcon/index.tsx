import React, { useState, useMemo, CSSProperties } from 'react';
import Icon, { IconProps } from '../Icon'
import './index.less';

declare type defaultImg = any;
declare type switchedImg = any;
interface IProps extends IconProps {
  point?: string
  // [string: any]: any
}

function ArrowIcon({ point = 'b', iconStyle, ...restProps }: IProps) {

  const transform = useMemo(() => {
    let p = 0;
    switch (point) {
      case "l":
        p = 90;
        break;
      case "r":
        p = 270;
        break;
      case "t":
        p = 180;
        break;
      case "b":
        p = 0;
        break;
      default:
        break;
    }
    return p;
  }, [point])

  return (
    <Icon name={'arrow'} iconStyle={{
      transform: `rotate(-${transform}deg)`,
      width: 12,
      height: 12,
      ...iconStyle,
    }} {...restProps} />
  );
}

export default ArrowIcon;