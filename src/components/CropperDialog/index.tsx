import React, { useEffect, useState } from "react";
import Cropper from 'components/common/Cropper';
import { SearchSelect } from "components/IRModal/IRSelect";
import Dialog from "components/common/Dialog";

const CropperDialog = ({ onClose, open, defaultImage }: any) => {
  const handleClose = (srcData: any) => {
    onClose && onClose(srcData)
  }
  return (
    <Dialog
      title={'Uploader and Cropper Image'}
      onClose={onClose}
      footer={[]}
      open={open}
    >
      <div style={{
        width: 300,
        // height: 300,
        background: '#ffffff'
      }}>
        <Cropper onClose={handleClose} defaultImage={defaultImage} />
        {/* <a href="https://www.pexels.com">
        <img src="https://images.pexels.com/lib/api/pexels-white.png" />
      </a> */}
        {/* <a href="https://www.pexels.com">Photos provided by Pexels</a> */}
      </div>
    </Dialog>
  )
}

export default CropperDialog