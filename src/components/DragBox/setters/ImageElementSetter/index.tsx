import React, { useEffect, useState } from "react";
import Icon from "components/common/Icon";
import Modal from "components/common/Modal";
import Cropper from 'components/common/Cropper';
import { SearchSelect } from "components/IRModal/IRSelect";
import Dialog from "components/common/Dialog";
import CropperDialog from "components/CropperDialog";

const LinkSetter = ({ node, onClose }: any) => {

  const [linkValue, setLinkValue] = useState('')

  const handleLinkSearch = (value: any) => {
    setLinkValue(value.link)
  }
  return (
    <div style={{
      width: 200,
      height: 200,
      background: '#ffffff'
    }}>
      <SearchSelect list={[]} onSelect={handleLinkSearch} showSearch value={linkValue} />

    </div>
  )
}

const CropperSetter = ({ type, onClose }: any) => {
  return (
    <div style={{
      width: 300,
      height: 300,
      background: '#ffffff'
    }}>
      <Cropper />
      {/* <a href="https://www.pexels.com">
        <img src="https://images.pexels.com/lib/api/pexels-white.png" />
      </a> */}
      {/* <a href="https://www.pexels.com">Photos provided by Pexels</a> */}
    </div>
  )
}

const ImageElementSetter = ({ node, onUpload, onCrop }: any) => {


  const [linkVisible, setLinkVisible] = useState(false)
  const [cropperVisible, setCropperVisible] = useState(false)
  const [defaultImage, setDefaultImage] = useState('')
  // const customContainer = document.getElementsByClassName('canvas-container')[0]

  const handleClick = (e: any, action: string) => {
    e.stopPropagation()
    if (action === 'u') {
      // onUpload(e)

      return;
    }
    if (action === 'c') {
      // onCrop()
      setDefaultImage(node.originProps.src)
      setCropperVisible(true)

      return;
    }
    if (action === 'l') {
      setLinkVisible(!linkVisible)
      return;
    }
  }

  return (
    <>
      <div className="node-operation-box">
        {
          ['u', 'c', 'l'].map((i, index) => (
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
      {cropperVisible && <CropperDialog onClose={(srcData: any) => {
        setCropperVisible(false);
        node.originProps = {
          ...node.originProps,
          src: srcData
        };
      }} open={cropperVisible} type='cropper' defaultImage={defaultImage} />}
    </>
  )
};

export default ImageElementSetter;