import React, { useRef, useState, MouseEvent, useEffect, useMemo } from 'react';
import cls from 'classnames'
import Icon from 'components/common/Icon';
import { DatumNearBy, Node, DatumLines } from 'interface'
import {
  getDragDiff,
  moved,
  getResizeDiff,
  modifyDatumsBasedOnSizeLimit,
  resized
} from 'utils'
import Tooltip from 'components/common/Tooltip';
import RightKeyMenu from 'components/RightKeyMenu';
import setters from './setters'
import './index.less';
import { handleDelete } from 'utils/events';

interface IProps {
  children: any;
  node: Node;
  curElement: any;
  checked: boolean;
  handleChangeNode: any;
  isLocked?: boolean;
  canvasHeight: number;
  setCanvasHeight: any;
  showDatumLines: (hor: DatumNearBy | undefined, ver: DatumNearBy | undefined) => void,
  getDatumLines: any;
  centerLeft: any,
  hideDatums: any,
  handleSelectNode: (node: any) => void;
}
interface Position {
  top: number,
  left: number,
}


function DragBox({ children, checked, node, curElement = {}, handleChangeNode, handleSelectNode, isLocked = false, showDatumLines, getDatumLines, centerLeft, hideDatums, canvasHeight, setCanvasHeight }: IProps) {

  const hasSetter = ["switcher", "slider", "menu", 'image', 'text'].includes(curElement.type)

  const [position, setPosition] = useState<Position>({
    left: node.position?.left,
    top: node.position?.top
  })
  const [size, setSize] = useState<any>({
    width: node.size?.width,
    height: node.size?.height,
  })

  const [isDraggableBox, setIsDraggableBox] = useState(false)
  const boxRef = useRef<any>()

  const _drag = useRef<any>(false)
  const _resize = useRef<any>('')
  const _startAt = useRef<any>({
    x: 0,
    y: 0
  })
  const _datums = useRef<DatumLines>({
    hor_border: [],
    ver_border: [],
    hor_center: [],
    ver_center: [],
    ver_simmetry: []
  })

  const sizeFolk = useRef<any>({
    width: 0,
    height: 0
  })
  sizeFolk.current = size
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.onkeydown = handleKeyDown;
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.onkeydown = null
    }
  }, [curElement])

  useEffect(() => {
    // setPosition({
    //   left: node.position?.left,
    //   top: node.position?.top
    // });
    setSize({
      width: node.size?.width,
      height: node.size?.height,
    })
  }, [node])

  useEffect(() => {
    setIsDraggableBox(checked)
  }, [checked])

  const handleKeyDown = (e: any) => {
    if (e.target.value) return null;
    if (curElement.type && e.keyCode === 8) {
      handleDelete(curElement)
    }
  }

  const handleMouseMove = (e: any) => {
    e.stopPropagation()
    if (_resize.current) {
      let diff = getResizeDiff(
        _resize.current,
        _startAt.current,
        { x: e.clientX, y: e.clientY },
        position,
        size,
        _datums.current,
        centerLeft
      );
      let val = resized(
        _resize.current,
        position,
        size,
        diff
      );
      const val2 = modifyDatumsBasedOnSizeLimit(
        val.isTopLimited,
        val.isBottomLimited,
        val.isLeftLimited,
        val.isRightLimited,
        _datums.current,
        centerLeft
      );
      showDatumLines(val2.horDatum || diff.horDatum, val2.verDatum || diff.verDatum);
      const left = val.position.left < 0 ? 0 : val.position.left + val.size.width < centerLeft * 2 ? val.position.left : centerLeft * 2 - val.size.width;
      const top = val.position.top < 0 ? 0 : val.position.top;

      if (val.position.top + val.size.height > canvasHeight) {
        setCanvasHeight(val.position.top + val.size.height)
      }

      // const width = val.position.left < 0 ? 0 : val.position.left + val.size.width < centerLeft * 2 ? val.position.left : centerLeft * 2 - val.size.width;
      // const height = 
      setPosition({
        left,
        top,
      })
      setSize({
        width: val.size.width,
        height: val.size.height,
      })
    };
    if (_drag.current) {
      let diff = getDragDiff(
        _startAt.current,
        { x: e.clientX, y: e.clientY },
        position,
        size,
        _datums.current,
        centerLeft
      );
      showDatumLines(diff.horDatum, diff.verDatum);
      let val = moved(position, { x: diff.x, y: diff.y });
      const left = val.left < 0 ? 0 : val.left + size.width < centerLeft * 2 ? val.left : centerLeft * 2 - size.width;
      const top = val.top < 0 ? 0 : val.top;
      if (val.top + size.height > canvasHeight) {
        setCanvasHeight(val.top + size.height)
      }
      setPosition({
        left,
        top
      })
    }
  };


  const handleMouseUp = (e: any) => {
    e.stopPropagation()
    if (_resize.current) {
      let diff = getResizeDiff(
        _resize.current,
        _startAt.current,
        { x: e.clientX, y: e.clientY },
        position,
        size,
        _datums.current,
        centerLeft
      );
      let val = resized(
        _resize.current,
        position,
        size,
        diff
      );
      const val2 = modifyDatumsBasedOnSizeLimit(
        val.isTopLimited,
        val.isBottomLimited,
        val.isLeftLimited,
        val.isRightLimited,
        _datums.current,
        centerLeft
      );
      showDatumLines(undefined, undefined);
      handleChangeNode && handleChangeNode({
        ...node,
        position: {
          left: val.position.left,
          top: val.position.top,
        },
        size: sizeFolk.current
      })
      _resize.current = ''
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    if (_drag.current) {
      let diff = getDragDiff(
        _startAt.current,
        { x: e.clientX, y: e.clientY },
        position,
        size,
        _datums.current,
        centerLeft
      );
      showDatumLines(undefined, undefined);
      let val = moved(position, { x: diff.x, y: diff.y });

      const left = val.left < 0 ? 0 : val.left + sizeFolk.current.width < centerLeft * 2 ? val.left : centerLeft * 2 - sizeFolk.current.width;
      const top = val.top < 0 ? 0 : val.top;
      // console.log('----------val.top:', val.top)

      if (val.top + sizeFolk.current.height > canvasHeight) {
        setCanvasHeight(val.top + sizeFolk.current.height)
      }

      handleChangeNode && handleChangeNode({
        ...node,
        size: sizeFolk.current,
        position: {
          left,
          top,
        },
      })
      _drag.current = false
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    // setIsDraggableBox(false)
    e.stopPropagation();
  };

  const onDragStart = (e: any) => {
    e.preventDefault();
    handleSelectNode && handleSelectNode(node)
    _datums.current = getDatumLines();
    _drag.current = true;
    _startAt.current = { x: e.clientX, y: e.clientY };
    e.stopPropagation()
  };

  const onResizeStart = (e: any, direction: string) => {
    e.preventDefault();
    _resize.current = direction;
    _datums.current = getDatumLines();
    _startAt.current = { x: e.clientX, y: e.clientY };
  }

  const handleCenterClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (node.type === "text" && boxRef.current) {
      const val = boxRef.current.querySelector("textarea");
      val?.select();
      val?.focus();
    }
  }

  const handleSetter = (v: any) => {
    console.log('---handle setter:', v)
  }




  // let groupPosition = position;
  // if (node.nodes) {
  //   groupPosition = {

  //   }
  // }


  return (
    <Tooltip
      overlay={<RightKeyMenu element={node} />}
      isRightKey={true}
      onClick={(e: any) => {
        e.stopPropagation()
        // handleChangeNode && handleChangeNode(node)
        handleSelectNode && handleSelectNode(node)
        // setIsDraggableBox(true)
      }}
    >
      <div
        ref={boxRef}
        style={{ ...position, ...size, zIndex: isDraggableBox && 99999 }}
        className={`drag-box-container ${isDraggableBox ? 'checked' : ''}`}
        onClick={(e: any) => {
          e.stopPropagation()
          // handleChangeNode && handleChangeNode(node)
          handleSelectNode && handleSelectNode(node)
          // setIsDraggableBox(true)
        }}

        onDragStart={onDragStart}
        draggable

      >
        {React.cloneElement(children)}
        <div className={`node_border ${isLocked ? 'locked' : ''}`}>
          <span className="top" onMouseDown={e => onResizeStart(e, "top")}></span>
          <span className="right" onMouseDown={e => onResizeStart(e, "right")}></span>
          <span className="bottom" onMouseDown={e => onResizeStart(e, "bottom")}></span>
          <span className="left" onMouseDown={e => onResizeStart(e, "left")}></span>
        </div>
        {!isLocked ? <div className="node_anchor">
          {/*<span className="anchor_0" onMouseDown={e => onResizeStart(e, "top")}></span>*/}  {/* top */}
          <span className="anchor_1" onMouseDown={e => onResizeStart(e, "topright")}></span>  {/* topright */}
          <span className="anchor_2" onMouseDown={e => onResizeStart(e, "right")}></span>  {/* right */}
          <span className="anchor_3" onMouseDown={e => onResizeStart(e, "bottomright")}></span>  {/* bottomright */}
          <span className="anchor_4" onMouseDown={e => onResizeStart(e, "bottom")}></span>  {/* bottom */}
          <span className="anchor_5" onMouseDown={e => onResizeStart(e, "bottomleft")}></span>  {/* bottomleft */}
          <span className="anchor_6" onMouseDown={e => onResizeStart(e, "left")}></span>  {/* left */}
          <span className="anchor_7" onMouseDown={e => onResizeStart(e, "topleft")}></span>  {/* topleft */}
          {/* {isDraggableBox && <Tooltip
          overlay={<RightKeyMenu element={node} />}
          isRightKey={true}
          onClick={(e: any) => e.stopPropagation()}
        >
          <span className={cls("anchor_8")}
            onDragStart={onDragStart}
            draggable
          // onDoubleClick={() => {
          //   console.log('-------onc')
          //   setIsDraggableBox(false)
          // }}
          />
        </Tooltip>} */}
          {/* center */}
        </div> :

          <div className="node_locked">
            <span className="locked_1" ></span>
            <span className="locked_3"></span>
            <span className="locked_5"></span>
            <span className="locked_7">
              <Icon name={'lock'} style={{
                width: '2rem',
                height: '2rem',
                background: '#ffffff',
                border: ' 0.1rem solid #ffffff',
                display: 'flex'
              }} />
            </span>
          </div>}

        {hasSetter &&
          <div
            className="node-operation-wrap"
          >
            {
              React.createElement(setters.get(`${curElement.type}ElementSetter`), {
                children,
                node,
                onChange: handleSetter
              })
            }
            <div
              onMouseDown={onDragStart}
              onClick={e => e.stopPropagation()}
              onDoubleClick={handleCenterClick}
              style={{
                flex: 1
              }}
            />
          </div>
        }
      </div>
    </Tooltip>
  );
}

export default DragBox;