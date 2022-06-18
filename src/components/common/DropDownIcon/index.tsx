import React, { useState } from 'react';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import './index.less'

interface IProps {
  children?: any;
  onClick: (e: any) => any;
  menuList: any[];
  theme?: 'light' | 'dark'
}

const DropDownIcon = ({ onClick, children, menuList = [], theme = 'dark' }: IProps) => {

  const [visible, setVisible] = useState(false)
  const handleIconClick = (e: any) => {
    e.preventDefault();
    setVisible(!visible)
  }
  const handleItemClick = (item: any) => {
    setVisible(false)
    onClick && onClick(item)
  }
  const overlay = (
    <div className={`overlay-container ${theme}`} >
      {menuList.map((item: any) => {
        return (
          <p key={item.key} onClick={() => handleItemClick(item)} className={`overlay-menuItem ${theme}`}>{item.title}</p>
        )
      })}
    </div>
  )

  return (
    <Tooltip
      overlay={overlay}
      visible={visible}
      isSelect={true}
      onClick={handleIconClick}
      defaultWidth={false}
    >
      {children ? children : <div className="icon-wrap">
        {
          ['+'].map((i, index) => (
            <div key={index} className="node-operation" >
              {i}
            </div>
          ))
        }
      </div>}
    </Tooltip>
  )

}

export default DropDownIcon