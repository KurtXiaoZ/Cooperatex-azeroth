import React, { useEffect, useState } from "react";
import Modal from 'components/common/Modal';
import AddButton from "components/common/AddButton";
import Icon from "components/common/Icon";
import remove from 'lodash/remove'
import DropSelect from "components/common/DropSelect";
import Dialog from "components/common/Dialog";

const ISetter = ({ node: { originProps = {} }, onChange }: any) => {
  const { menuItems, menuType } = originProps;
  const [linkVisible, setLinkVisible] = useState(false)
  const [curItem, setCurItem] = useState<any>({})
  const customContainer = document.getElementsByClassName('canvas-content')[0]

  useEffect(() => {
    console.log('---------linkVisible:', linkVisible)

  }, [linkVisible])

  const handleDelete = (item: any) => {
    console.log('----------handle delete item:', item)
    remove(menuItems, (i: any) => i.key === item.key)
  }

  const handleLink = (item: any) => {
    console.log('----------handle link item:', item)
    setLinkVisible(true)
    setCurItem(item)
  }

  const handlelLinkChange = (value: any) => {
    // curItem.link = value
  }

  const handleAddItem = () => {
    menuItems.push(
      {
        title: 'add menu item',
        key: Date.now(),
        type: 'item'
      }
    )
  }

  const handleAddCategory = () => {
    menuItems.push(
      {
        title: 'add menu category',
        key: Date.now(),
      }
    )
  }


  // console.log('---------linkVisible:', linkVisible)
  return (
    <>
      <div style={{
        width: 200,
        background: '#ffffff'
      }}>
        {(menuItems || []).map((item: any) => {
          return <p style={{
            display: 'flex',
            padding: '8px 12px',
            justifyContent: 'space-between'
          }}>
            <span>
              <Icon name="delete" onClick={() => handleDelete(item)} />
              <span style={{ padding: '0 4px 4px' }}>{item.title}</span>
            </span>
            {(menuType === 'hamburger' || (menuType === 'drawer' && item.type === 'item')) && <span onClick={() => handleLink(item)}>link</span>}
          </p>
        })}
        <p style={{
          padding: '4px 0'
        }}>
          <AddButton text="Add More Item" onAdd={handleAddItem} />
        </p>
        {
          menuType === 'drawer' && <p style={{
            padding: '4px 0'
          }}>
            <AddButton text="Add More Category" onAdd={handleAddCategory} />
          </p>
        }
      </div>
      {
        linkVisible && <Dialog
          open={linkVisible}
          onClose={() => setLinkVisible(false)}
          title="Link To Page"
          footer={null}
        >
          <DropSelect dataSource={[]} onChange={handlelLinkChange} />
        </Dialog>
      }
    </>
  )
}


const MenuElementSetter = ({ node, onChange }: any) => {

  const [visible, setVisible] = useState(false)
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
            <div key={index} className="node-operation" onClick={handleClick}>
              {i}
            </div>
          ))
        }
      </div>
      {visible && <Modal
        title={'Menu Set Up'}
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

export default MenuElementSetter;
