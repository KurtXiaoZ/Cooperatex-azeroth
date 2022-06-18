import React, { useEffect, useState, DragEvent, useRef } from 'react';
import cls from 'classnames';
import Draggable from 'react-draggable';
import { Node } from 'interface';
import Icon from 'components/common/Icon';
import Renderer from 'components/Renderer';
import { elList } from './datas';
import ArrowIcon from 'components/common/ArrowIcon';
import './index.less'
import CropperDialog from 'components/CropperDialog';

function DraggableComponent(props: any) {
  const { handle, cancel, children } = props
  return (
    <Draggable
      handle={handle}
      cancel={cancel}
    >
      {children}
    </Draggable>
  );
}


const ElementCard = ({ onSelect, el, showGhost }: any) => {
  const { title, icons, id, customIcon } = el;
  const [hasClicked, setHasClicked] = useState<boolean>(false)

  const handleDrag = (e: any) => {
    e.preventDefault();
    // console.log('---------handle drag')
    showGhost(e, el)
  }

  const handleSelected = (e: any) => {
    // console.log('-----------handleSelected:')
    e.preventDefault();
    onSelect && onSelect(el)
    e.stopPropagation()
  }
  return (
    <div
      // key={id}
      onMouseDown={handleDrag}
      onDrag={e => {
        e.preventDefault();
      }}
      draggable
    >
      {customIcon ?
        <div
          onClick={handleSelected}
          style={{
            padding: 8
          }}
        >
          <Icon name={hasClicked ? icons[1] : icons[0]} key={title} iconStyle={{
            width: 100,
            height: 50,

          }} />
        </div> :
        <div
          onClick={handleSelected}
          className={`element-card ${hasClicked ? 'clicked' : ''}`}
        >
          <Icon name={hasClicked ? icons[1] : icons[0]} key={title} iconStyle={{
            width: 40,
            height: 40,
          }} />
          {title ? <div>{title}</div> : null}
          {/* <div className={`element-tip`}>Add a {title}</div> */}
        </div>
      }
    </div>
  )
}


interface IProps {
  handleAddNewNode: (el: any) => void,
}

function Elements({ handleAddNewNode }: IProps) {

  const [pos, setPos] = useState({
    top: 0,
    left: 0
  })

  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [cropperVisible, setCropperVisible] = useState(false)


  const [elementList, setElementList] = useState<any[]>([]);
  const [element, setElement] = useState<any>({});
  const [elementSpecies, setElementSpecies] = useState<any[]>([]);
  const [newNode, setNewNode] = useState<any>(null)
  const [newNodePos, setNewNodePos] = useState({
    left: 0,
    top: 0
  })
  const [ghostVisible, setGhostVisible] = useState<boolean>(false)

  const [deltaPosition, setDeltaPosition] = useState({
    x: 0, y: 0
  })

  const btnRef = useRef<HTMLDivElement>(null);
  const canvasContentRef = useRef<any>(null);

  useEffect(() => {
    // TODO: require elementList
    setElementList(elList)
    canvasContentRef.current = document.getElementsByClassName('canvas-content')[0]
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleElementDrag);
    window.addEventListener("mouseup", stopAdding);
    return () => {
      window.removeEventListener("mousemove", handleElementDrag);
      window.removeEventListener("mouseup", stopAdding);
    }
  }, [ghostVisible])

  const handleExpand = () => {
    setIsExpand(!isExpand);
    if (!!isExpand) setElement({})
  }

  const stopAdding = (e: any) => {
    if (ghostVisible && newNode) {
      setGhostVisible(false)
      const canvasValue = canvasContentRef.current?.getBoundingClientRect()
      let newElPosition = {
        left: canvasValue.width / 2 - newNode.size.width / 2,
        top: canvasValue.height / 2 - newNode.size.height / 2 + document.documentElement.scrollTop,
      }
      if (e.clientX > newNodePos.left) {
        newElPosition = {
          left: e.clientX - canvasValue.left - newNode.size.width / 2,
          top: e.clientY - canvasValue.top - newNode.size.height / 2,
        }
        if (newNode.type === 'image') {
          setCropperVisible(true)
        } else {
          handleAddNewNode({
            ...newNode,
            position: newElPosition
          });
        }
      }
    }
    e.stopPropagation()
  }

  const handleShowGhost = (e: any, el: any) => {
    if (!el.children) {
      setNewNode(el.elementDefaultData)
      setGhostVisible(true)
      setNewNodePos({
        left: e.clientX,
        top: e.clientY
      })
    }
  }

  const handleElementDrag = (e: any) => {
    if (ghostVisible) {
      setNewNodePos({
        left: e.clientX,
        top: e.clientY
      })
    }
  }

  const onSelect = (el: any) => {
    if (!el.children && !ghostVisible) {
      const elNode = el.elementDefaultData
      if (elNode.type === 'image') {
        setGhostVisible(false)
        setCropperVisible(true)
        setNewNode(elNode)
      } else {
        handleAddNewNode({
          ...elNode,
        });
      }
    } else {
      setElement(el);
      // TODO: require elementSpecies
      setElementSpecies(el.children);
    }
  }

  const handleDrag = (e: any, ui: { deltaX: number; deltaY: number; }) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    })
  };

  return (
    <>
      <DraggableComponent
        handle=".elements-title"
        cancel={'[class*="element-list-content"]'}
        onDrag={handleDrag}
      >
        <div
          className={`elements-container ${isExpand ? 'expand' : ''}`}
          style={{
            left: deltaPosition.x.toFixed(0),
            top: deltaPosition.y.toFixed(0),
          }}
        >
          <div
            id="elements-title"
            className={`elements-title ${isDrag ? 'dragging' : ''}`}
          >
            <span>
              <span className={cls("element-text", element.title ? 'clickeble' : '')} onClick={() => element.title && setElement({})}>Elements</span>
              {element.title && <span>
                <span style={{ margin: '0 8px' }}>{'>'}</span>
                {element.title}
              </span>}
            </span>
            <ArrowIcon point={isExpand ? 'r' : "b"} onClick={handleExpand} />
          </div>
          {isExpand && <div className="element-list">
            <div className="element-list-content" >
              {
                (element.title ? elementSpecies : elementList || []).map((el: any) => {
                  return <ElementCard key={el.id} el={el} onSelect={onSelect} showGhost={handleShowGhost} />
                })
              }
            </div>
          </div>}
        </div>
      </DraggableComponent>
      {ghostVisible && <Ghost node={newNode} top={newNodePos.top} left={newNodePos.left} />}

      {
        cropperVisible && <CropperDialog onClose={(srcData: any) => {
          setCropperVisible(false);
          handleAddNewNode({
            ...newNode,
            originProps: {
              src: srcData, alt: `image-${Date.now()}`
            }
          });
        }} open={cropperVisible} />
      }
    </>
  );
}


interface IGhost {
  node: Node,
  top: number,
  left: number
}
const Ghost = (props: IGhost) => {
  const { node, top, left } = props

  if (!node) return null;
  return (
    <div
      className="ghost"
      style={{
        top: `${top - node.size.height / 2 - 134}px`,
        left: `${left - node.size.width / 2 - 350}px`,
        width: `${node.size.width}px`,
        height: `${node.size.height}px`,
        zIndex: 999
      }}
    >
      <Renderer node={node} />
    </div>
  )
};

export default Elements;

