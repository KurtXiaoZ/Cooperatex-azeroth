import React, { useEffect, useState } from "react";
import Icon from "components/common/Icon";
import Modal from "components/common/Modal";
import Cropper from 'components/common/Cropper';
import { SearchSelect } from "components/IRModal/IRSelect";
import Dialog from "components/common/Dialog";

const LinkSetter = ({ node, onClose }: any) => {

  const [linkValue, setLinkValue] = useState('')

  const handleLinkSearch = (value: any) => {
    setLinkValue(value.link)
  }
  return (
    <div style={{
      width: 200,
      background: '#ffffff'
    }}>
      <SearchSelect list={[]} onSelect={handleLinkSearch} showSearch value={linkValue} />

    </div>
  )
}

const TextElementSetter = ({ node, onUpload, onCrop }: any) => {

  const [linkVisible, setLinkVisible] = useState(false)
  const customContainer = document.getElementsByClassName('canvas-container')[0]

  const handleClick = (e: any, action: string) => {
    e.stopPropagation()
    if (action === 'l') {
      setLinkVisible(!linkVisible)
      return;
    }
  }

  return (
    <>
      <div className="node-operation-box">
        {
          ['l'].map((i, index) => (
            <div key={index} className="node-operation" onClick={(e) => handleClick(e, i)} >
              {i}
            </div>
          ))
        }
      </div>
      {
        linkVisible && <Dialog
          open={linkVisible}
          onClose={() => setLinkVisible(false)}
          title="Link To Page"
          footer={null}
        >
          <LinkSetter node={node} />
        </Dialog>
      }
      {/* {linkVisible && <Modal
        title={'Link To Page'}
        visible={linkVisible}
        onClose={() => setLinkVisible(false)}
        footer={null}
        customContainer={customContainer}
      >
        <LinkSetter node={node} />
      </Modal>} */}
    </>
  )
};

export default TextElementSetter;