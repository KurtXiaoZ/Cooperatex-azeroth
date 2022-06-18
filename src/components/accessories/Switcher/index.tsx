import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { Thumbs } from 'swiper';
import ASwiper from 'components/common/Swiper';
import { Node } from 'interface';
import Renderer from 'components/Renderer';
import { StoreProps, withStore } from 'store'

import './index.less';

export interface SwitcherProps {
  switcherItems?: Node[]
}

interface IProps extends StoreProps, Node {

}

function Switcher(props: IProps) {
  const { style, children = [], originProps = {}, nodes, store } = props
  // const { switcherItems = [] } = originProps || {};
  const { state: { curElement }, setCurElement } = store
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [curItem, setCurItem] = useState<any>(nodes[0])

  useEffect(() => {
    if (curElement.type === 'switcherItem') setCurItem(curElement)
  }, [curElement])
  // console.log('--------switcher curItem:', curItem)

  return (
    <div className="accessory-element-switcher-wap">
      <div
        className="accessory-element-switcher"
        style={style}
      >
        <div className="switcher-content-wrap">
          <div className="switcher-swiper-wrap switcher-nav">
            <ASwiper
              onSwiper={setThumbsSwiper}
              spaceBetween={0}
              slidesPerView={4}
              freeMode={true}
              modules={[Thumbs]}
              watchSlidesProgress={true}
              items={nodes}
              pagination={false}
              renderItem={(item: any) => {
                return (
                  <span className={cls(
                    "switcher-item-name",
                    `${item.id === curItem.id ? 'checked' : ''}`
                  )}
                    onClick={() => {
                      setCurItem(item);
                      setCurElement(item)
                    }}
                  >
                    {item.name}
                  </span>
                )
              }}
            />
          </div>
          <div className="switcher-swiper-wrap content">
            <ASwiper
              items={children}
              pagination={false}
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff', height: 150 }}
              renderItem={(item: any) => {
                return (
                  React.cloneElement(item)
                )
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStore(Switcher);
