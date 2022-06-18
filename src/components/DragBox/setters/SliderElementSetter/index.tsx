import React, { useEffect, useState } from "react";
import remove from 'lodash/remove'

import AddButton from "components/common/AddButton";
import Icon from "components/common/Icon";
import Modal from "components/common/Modal";
import ASwiper from "components/common/Swiper";
import './index.less';

const ISetter = ({ node: { type, originProps }, onChange }: any) => {
  const { sliderItems } = originProps;
  const handleDelete = (item: any) => {
    remove(sliderItems, (i: any) => i.key === item.key)
  }

  const handleLink = (item: any) => {
    console.log('------handle link item:', item)
  }

  const handleAddItem = () => {
    console.log('----------handle add item')
    // TODO: upload image
  }

  return (
    <div
      className="slider-setter-wrap"
    >
      <div >
        <ASwiper
          items={sliderItems}
          mousewheel={false}
          pagination={false}
          navigation={true}
          renderItem={(item: any) => {
            return (
              <div className="slider-swiper-box">
                <img src={item.src} alt={item.key} />
                <div className="slider-swiper-mask">
                  <Icon name="delete" onClick={() => handleDelete(item)} />
                  {/* <Icon name="link" /> */}
                  <span onClick={() => handleLink(item)}>link</span>
                </div>
              </div>
            )
          }}
        />
      </div>
      <p style={{
        padding: '8px 0'
      }}>
        <AddButton onAdd={handleAddItem} />
      </p>

    </div>
  )
}

const SliderElementSetter = ({ node, onChange }: any) => {

  const [visible, setVisible] = useState(false)

  const [actionType, setActionType] = useState('plus')
  const customContainer = document.getElementsByClassName('canvas-content')[0]

  const handleClick = (e: any) => {
    e.preventDefault();
    setVisible(!visible)
  }

  return (
    <>
      <div className="node-operation-box">
        {
          ['+'].map((i, index) => (
            <div key={index} className="node-operation" onClick={(e: any) => handleClick(e)}>
              {i}
            </div>
          ))
        }
      </div>
      {visible && <Modal
        title={'Switcher Set Up'}
        visible={visible}
        onClose={() => setVisible(false)}
        footer={null}
        customContainer={customContainer}
      >
        <ISetter node={node} onChange={onChange} />
      </Modal>}
    </>
  )
};

export default SliderElementSetter;