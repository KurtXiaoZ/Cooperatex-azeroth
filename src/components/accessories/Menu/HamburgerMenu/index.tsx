import Tooltip from 'components/common/Tooltip';
import React, { useState } from 'react';

function HamburgerMenu(props: any) {
  const { menuList } =props
  const [visible, setVisible] = useState(false)
  const handleClick = (e: any) => {
    e.preventDefault();
    setVisible(!visible)
  }
  const overlay = (
    <div style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 0 10px #00000029',
      padding: '2px 8px',
      width: 150,
      borderRadius: 3
    }}>
      {menuList.map((item: any) => {
        return (
          <p key={item.key}>{item.title}</p>
        )
      })}
    </div>
  )
  return (
    <Tooltip 
      overlay={overlay} 
      visible={visible}
      isSelect={true}
      onClick={handleClick}
      defaultWidth={false}
    >
      <div className="node-operation-box">
        {
          ['+'].map((i, index) => (
            <div key={index} className="node-operation" >
              {i}
            </div>
          ))
        }
      </div>
    </Tooltip>
  )
}

export default HamburgerMenu;
