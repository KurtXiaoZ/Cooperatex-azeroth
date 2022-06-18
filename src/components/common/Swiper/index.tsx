
import React, { CSSProperties, useRef, useState } from "react";
import cls from 'classnames';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
// import Swiper core and required modules
import SwiperCore, {
  Mousewheel,
  Pagination,
  FreeMode,
  Thumbs,
  Navigation
} from 'swiper';
// Import Swiper styles
import 'swiper/swiper.less';
import 'swiper/modules/navigation/navigation.less';
import 'swiper/modules/pagination/pagination.less';
import "swiper/modules/free-mode/free-mode.less"
import "swiper/modules/thumbs/thumbs.less"

import "./index.less"

interface IProps {
  items: any[];
  className?: string;
  renderItem: (item: any, index: number, slideData: any) => any;
  style?: any;
  isSwitcher?: boolean;
  onSwiper?: (props: any) => void;
  [props: string]: any
}


// install Swiper modules
SwiperCore.use([Mousewheel, Pagination, FreeMode, Thumbs, Navigation]);

export default function ASwiper(props: IProps) {

  const { items = [], className, renderItem, isSwitcher, style, ...restProps } = props

  return (
    <div className="swiper-container">
      <Swiper
        direction={'horizontal'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          "clickable": true
        }}
        className={cls("mySwiper", className)}
        style={style}
        {...restProps}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {(slideData) => renderItem(item, index, slideData)}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
