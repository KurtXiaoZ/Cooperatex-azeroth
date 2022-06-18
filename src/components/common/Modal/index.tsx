import React from "react";
import cls from 'classnames';
import Tooltip from 'components/common/Tooltip';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import Fade from "../Fade";
import './index.less'


const ModalContainer = (props: any) => {
  const { title, theme = 'light', children, footer, cancelText, confirmText, onClose, onConfirm, extraAction } = props;

  const handleClose = () => {
    onClose && onClose()
  }
  return (
    <div className={cls("modal-container", theme)}>
      <div>
        {title && <p className="modal-header">
          {title}
          {/* <Icon name={'up'} onClick={handleClose} /> */}
          <span onClick={handleClose} >X</span>
        </p>}
        <div className="modal-content">
          {children}
        </div>
        {(footer || footer === null) ? footer : <div className="modal-footer">
          {extraAction}
          <div>
            <Button type="default" onClick={onClose}>{cancelText || 'cancel'}</Button>
            <Button type="primiry" onClick={onConfirm}>{confirmText || 'confirm'}</Button>
          </div>
        </div>}
      </div>
    </div >
  )
}
const Modal = (props: any) => {
  const { children, visible, onClose, customContainer, ...restModalProps } = props
  return (
    <Tooltip
      overlay={
        <Fade in={visible} >
          <ModalContainer
            children={children}
            onClose={onClose}
            {...restModalProps}
          />
        </Fade>
      }
      isModal={true}
      visible={visible}
      customContainer={customContainer}
    >
    </Tooltip >
  )
};

export default Modal;