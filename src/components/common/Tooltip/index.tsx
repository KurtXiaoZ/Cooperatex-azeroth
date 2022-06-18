import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './index.less';

function Tooltip({ children = '', overlay, isRightKey, onClick, isModal, isSelect, customContainer, visible, popupStyle, placement = 'bl', defaultWidth = false }: any) {

  const container = document.createElement('div');

  const [contentPos, setContentPos] = useState<any>({
    left: 0,
    top: 0
  })

  const [contentDisplay, setContentDisplay] = useState(false)
  const [lock, setLock] = useState(false)

  const childrenRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible !== undefined) setContentDisplay(visible);
  }, [visible])

  useEffect(() => {
    if (contentDisplay) {
      if (customContainer) {
        customContainer.appendChild(container)
      } else {
        document.body.appendChild(container)
      }
      container.className = 'tooltip-container';
      document.addEventListener('click', handleRightKeyClick)
      // document.addEventListener('contextmenu', handleRightKeyClick)

      return () => {
        if (customContainer) {
          customContainer.removeChild(container)
        } else {
          document.body.removeChild(container);
        }
        document.removeEventListener('click', handleRightKeyClick)
        // document.removeEventListener('contextmenu', handleRightKeyClick)
      }
    }
  }, [container, contentDisplay])

  useEffect(() => {
    if (isRightKey) return;
    if (contentDisplay && contentRef.current) {
      const contentVal = contentRef?.current?.getBoundingClientRect();
      let leftVal: number = 0;
      let topVal: number = 0;
      if (isModal) {
        let windowWidth: any, windowHeight: any;
        if (customContainer) {
          windowWidth = customContainer.clientWidth;
          windowHeight = customContainer.clientHeight;
        } else {
          windowWidth = document.body.clientWidth;
          windowHeight = document.body.clientHeight;
        }
        leftVal = windowWidth / 2 - contentVal.width / 2;
        topVal = windowHeight / 2 - contentVal.height / 2;
        setContentPos({
          left: leftVal,
          top: topVal,
        })
        return;
      }

      if (isSelect && childrenRef.current) {
        const childrenVal = childrenRef?.current?.getBoundingClientRect();
        switch (placement) {
          case 'l':
            leftVal = childrenVal.x - contentVal.width;
            topVal = childrenVal.y + childrenVal.height / 2 - contentVal.height / 2;
            break;
          case 'r':
            leftVal = childrenVal.x + contentVal.width;
            topVal = childrenVal.y + childrenVal.height / 2 - contentVal.height / 2;
            break;
          case 'lt':
            leftVal = childrenVal.x;
            topVal = childrenVal.y - childrenVal.height;
            break;
          case 'tl':
            leftVal = childrenVal.x + childrenVal.width / 2 - contentVal.width / 2;
            topVal = childrenVal.y - childrenVal.height;
            break;
          case 't':
            leftVal = childrenVal.x + childrenVal.width / 2 - contentVal.width / 2;
            topVal = childrenVal.y - childrenVal.height;
            break;
          case 'tr':
            leftVal = childrenVal.x + childrenVal.width / 2 - contentVal.width / 2;
            topVal = childrenVal.y - childrenVal.height;
            break;
          case 'bl':
            leftVal = childrenVal.x;
            topVal = childrenVal.y + childrenVal.height;
            break;
          case 'br':
            leftVal = childrenVal.x + childrenVal.width - contentVal.width;
            topVal = childrenVal.y + childrenVal.height;
            break;
          case 'b':
            leftVal = childrenVal.x + childrenVal.width / 2 - contentVal.width / 2;
            topVal = childrenVal.y + childrenVal.height;
            break;
          default:
            break
        }

        setContentPos({
          left: leftVal,
          top: topVal,
          width: defaultWidth ? childrenVal.width : contentVal.width,
        })
      }
    }
  }, [contentDisplay])

  const handleRightKey = (e: any) => {
    e.stopPropagation()
    if (isRightKey && e.button === 2) {
      e.preventDefault();
      setContentDisplay(true);
      setContentPos({
        left: e.clientX,
        top: e.clientY
      })
    }
  }

  const handleChildrenClick = (e: any) => {
    e.stopPropagation()
    if (isRightKey) {
      setContentDisplay(false);
    }
    onClick && onClick(e)
    return;
  }

  const handleRightKeyClick = (e: any) => {
    // if (contentDisplay && contentRef.current) {
    //   const contentVal = contentRef?.current?.getBoundingClientRect();
    //   console.log('------contentVal:', contentVal)
    // if (!((contentVal.x  < e.clientX && e.clientX < contentVal.x + contentVal.width) && (contentVal.y  < e.clientY && e.clientY < contentVal.y + contentVal.height))) {
    //   setContentDisplay(false);
    //   setLock(false)
    // }
    // }
    // console.log('---------handleclick')
    // setContentDisplay(false);
    e.stopPropagation()
    console.log('--------handleRightKeyClick')
    if (isRightKey) {
      setContentDisplay(false);
    }
    // setLock(false)
  }


  const content = cloneElement((
    <div key={new Date().valueOf().toString()} ref={contentRef} className="content-container" style={{
      ...contentPos,
      ...popupStyle,
    }}>
      {overlay}
    </div>
  ))

  return (
    <>
      <div ref={childrenRef}>
        {children && cloneElement(children, {
          // ref: childrenRef,
          onClick: handleChildrenClick,
          onContextMenu: handleRightKey
        })}
      </div>
      {contentDisplay && createPortal(content, container)}
    </>

  );
}

export default Tooltip;


