import React from "react";
import Tooltip from 'components/common/Tooltip';
import Icon from 'components/common/Icon';
import up from 'assets/svgs/up.svg';
import Button from 'components/common/Button';

import './index.less'

const DrawerContainer = (props: any) => {
  const {title, children, footer, cancelText, confirmText, onClose, onConfirm} = props;

  const handleClose = () => {
    onClose && onClose()
  }
  return (
    <div className="drawer-container">
      <p className="drawer-header">
        <span>{title}</span>
        <Icon name={'up'} onClick={handleClose}/>
      </p>
      <div className="drawer-content">
        {children}
      </div>
      {(footer || footer === null) ? footer : <div className="drawer-footer">
        <Button type="default" onClick={onClose}>{cancelText || 'cancel'}</Button>
        <Button type="primiry" onClick={onConfirm}>{confirmText || 'confirm'}</Button>
      </div>}
    </div>
  )
}
const Drawer = (props :any) => {
  const {children, visible, onClose, customContainer, ...restDrawerProps} = props;
  return (
    <Tooltip 
      overlay={<DrawerContainer 
        children={children} 
        onClose={onClose}
        footer={null}
        {...restDrawerProps} 
      />} 
      placement={'lt'}
      customContainer={customContainer}
      visible={visible}
    />
  )
};

export default Drawer;
