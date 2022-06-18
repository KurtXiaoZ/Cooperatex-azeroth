import React, { useState } from "react";
import Modal from 'components/common/Modal';
import { Node } from 'interface'
import Icon from "components/common/Icon";
import AddButton from "components/common/AddButton";
import remove from 'lodash/remove'
import EditableText from "components/common/EditableText";

const ISetter = ({ node: { type, originProps }, onChange }: any) => {
  const { switcherItems } = originProps;
  const handleDelete = (item: any) => {
    remove(switcherItems, (i: any) => i.key === item.key)
  }

  const handleAddItem = () => {
    switcherItems.push(
      {
        title: 'custom item',
        key: Date.now(),
        nodes: []
      }
    )
  }
  const handleChangeItemName = (item: any, value: any) => {
    console.log('------------item:', item)
    console.log('------------value:', value)
  }

  console.log('----------switcherItems:', switcherItems)
  return (
    <div style={{
      width: 200,
      background: '#ffffff'
    }}>
      {(switcherItems || []).map((item: any) => {
        return <p style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 12px'
        }}>
          {/* {item.title} */}
          <EditableText theme="light" text={item.title} onChange={(value: any) => handleChangeItemName(item, value)} />
          <Icon name="delete" onClick={() => handleDelete(item)} />
        </p>
      })}
      <p style={{
        padding: '8px 0'
      }}>
        <AddButton onAdd={handleAddItem} />
      </p>
    </div>
  )
}
const SwitcherElementSetter = ({ node, onChange }: any) => {

  const [visible, setVisible] = useState(false)
  const customContainer = document.getElementsByClassName('canvas-content')[0]

  const handleClick = (e: any) => {
    e.preventDefault();
    setVisible(!visible)
  }

  // console.log('---------------suibianshasha')

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
      {/* {visible && <Modal
        title={'Switcher Set Up'}
        visible={visible}
        onClose={() => setVisible(false)}
        footer={null}
      // customContainer={customContainer}
      >
        <ISetter node={node} onChange={onChange} />
      </Modal>} */}
    </>
  )
};

export default SwitcherElementSetter;