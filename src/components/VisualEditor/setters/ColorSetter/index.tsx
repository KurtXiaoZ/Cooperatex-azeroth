import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import Checkbox from 'components/common/Checkbox';
import './index.less'
import MTooltip from 'components/common/MTooltip';

function ColorSetter({ colorType, value, onChange }: any) {
  const [materialColor, setMaterialColor] = useState({ color: value || '#FFFFFF' })
  const [open, setOpen] = React.useState(false);
  const openFake = useRef<any>(null)


  const triggerBox = useRef<HTMLDivElement>(null)
  const contentBox = useRef<HTMLDivElement>(null)
  openFake.current = open
  // useEffect(() => {
  //   document.addEventListener('click', handleCloseOpen)
  //   return () => { document.removeEventListener('click', handleCloseOpen) }
  // }, [])
  const handleCloseOpen = (e: any) => {
    console.log('---handleclose', open)

    if (!openFake.current) return;
    console.log('----------e.clientX', e.clientX)
    if (contentBox?.current && triggerBox?.current) {
      const contentVal = contentBox?.current?.getBoundingClientRect();
      const triggerVal = triggerBox?.current?.getBoundingClientRect();
      console.log('----------contentVal:', contentVal)
      console.log('-----------triggerVal:', triggerVal)
      // const xLessList = [contentVal.x, triggerVal.x]
      // const yLessList = [contentVal.y, triggerVal.y]
      // const xMoreList = [contentVal.x + contentVal.width, triggerVal.x + triggerVal.width]
      // const yMoreList = [contentVal.y + contentVal.height, triggerVal.y + triggerVal.height]

      let Clicked = false;
      // xLessList.forEach((x: any) => {
      //   if (e.clientX < x) Clicked = true
      // });
      // yLessList.forEach((y))

      if (e.clientX < contentVal.x || e.clientX < triggerVal.x || e.clientX > contentVal.x + contentVal.width || e.clientX > triggerVal.x + triggerVal.width || e.clientY < contentVal.y || e.clientY < triggerVal.y || e.clientY > contentVal.y + contentVal.height || e.clientY > triggerVal.y + triggerVal.height) {
        console.log('--------')
        setOpen(false)
      }

    }



    // if (e.clientX)
    // setOpen(false)

  }
  const handleOpen = () => {
    console.log('--------handleopen')
    setOpen(!open);
  };

  useEffect(() => {
    setMaterialColor({ color: value })
  }, [value])

  const handleColorChange = (colorCode: any) => {
    setMaterialColor({ color: colorCode.hex })
    onChange && onChange({ color: colorCode.hex })
  }

  const handleInputChange = (e: any) => {
    setMaterialColor({ color: e.target.value })
    if (e.target.value.length > 6) onChange && onChange({ color: e.target.value })
  }

  const overlay = (
    <div ref={contentBox}>
      <SketchPicker onChange={handleColorChange} color={materialColor.color} />
    </div>
  )

  return (
    <div className="color-setter">
      <div className="color-setter-item" style={{ display: 'flex' }}>
        <Checkbox />
      </div>
      <MTooltip
        overlay={overlay}
        open={open}
        placement="left"
      >
        <div
          className="color-preview-box color-setter-item"
          style={{ background: materialColor.color }}
          onClick={handleOpen}
          ref={triggerBox}
        />
      </MTooltip>

      <div className="color-setter-item">
        <input type="text" className="color-input" onChange={handleInputChange} value={materialColor.color} />
      </div>
      <div className="color-setter-item">
        {colorType}
      </div>
      {/* <div className="color-setter-item">
        <Icon name={'bottomAlign'} />
      </div> */}

    </div >

  );
}

export default ColorSetter;
