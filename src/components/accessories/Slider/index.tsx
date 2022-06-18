import { noop } from '@babel/types';
import React, { useEffect, useMemo, useState } from 'react';
import { Node } from '../../../interface';
import { RouteProps, withRouter } from 'App';
import ASwiper from 'components/common/Swiper'
import './index.less';

export interface SliderProps {
  speed?: number,
  autoplay?: boolean,
  sliderItems?: {
    src: string;
    key: string;
    link: string
  }[],
  deley?: number,
  showDots?: boolean,
  pause?: boolean
}

function Slider({ style, originProps = {}, navigate }: Node & RouteProps) {

  const { sliderItems = [], ...restSliderElementProps } = originProps

  return (
    <div
      className="accessory-element-slider"
      style={style}
    >
      <div className="slider-swiper-wrap">
        <ASwiper
          items={sliderItems}
          renderItem={(item: any) => {
            return (
              <img src={item.src} alt={item.key} onClick={() => item.link && navigate && navigate(item.link)} />
            )
          }}
          {...restSliderElementProps}
        />
      </div>
    </div>
  );
}

export default withRouter(Slider);


