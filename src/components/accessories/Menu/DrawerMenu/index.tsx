import React, { useEffect, useRef, useState } from "react";
import Drawer from "components/common/Drawer";

const DrawerMenu = ({ menuList }: any) => {

  const [visible, setVisible] = useState(false)

  const customContainerRef = document.getElementsByClassName('canvas-content')[0]

  const handleClick = (e: any) => {
    e.preventDefault();
    setVisible(!visible)
  }

  return (
    <>
      <div className="node-operation-box">
        {
          ['+'].map((i, index) => (
            <div key={index} className="node-operation" onClick={handleClick}>
              {i}
            </div>
          ))
        }
      </div>
      {visible && <Drawer
        title={''}
        visible={visible}
        onClose={() => setVisible(false)}
        footer={null}
        customContainer={customContainerRef}
      >
        {(menuList || []).map((item: any) => {
          return item.children ? (
            <p style={{
              fontSize: 18
            }} key={item.key}>{item.title}</p>
          ) : (
            <p key={item.key}>{item.title}</p>
          )
        })}
      </Drawer>}
    </>
  )
};

export default DrawerMenu;

