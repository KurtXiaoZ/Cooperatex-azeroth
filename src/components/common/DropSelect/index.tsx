import Search from 'components/common/Search';
import Tooltip from 'components/common/Tooltip';
import React, { useEffect, useRef, useState } from 'react';
import './index.less'
import Icon from '../Icon';
import AddButton from '../AddButton';
import EditableText from '../EditableText';
import classNames from 'classnames';
import ArrowIcon from '../ArrowIcon';

const defaultData = [
  {
    label: 'option1',
    value: 'option1',
  },
  {
    label: 'option2',
    value: 'option2',

  },
  {
    label: 'option3',
    value: 'option3',
  },
]

const DropList = ({ list, onSelect, setList, editable, editableIcon, dropClassName }: any) => {
  const [curItem, setCurItem] = useState<any>(null)
  const handleClick = (item: any) => {
    onSelect && onSelect(item)
  }

  const handleAddOption = () => {
    // setList && setList({
    //   name: '',
    //   key: ''
    // })
  }

  const handleDeleteItem = (i: any) => {
    console.log('-----i:', i)
  }

  const handleItemChange = (node: any, value: any) => {
    console.log('------------handleItemChange')
    // const newDatas = (list || []).map((item: any) => {
    //   if (node.key === item.value) {
    //     return {
    //       ...item,
    //       name: value
    //     }
    //   }
    //   return item
    // })
    // setList && setList(newDatas)
  }
  return list.length > 0 ? (
    <div className={classNames("dropdown-list-wrap", dropClassName)}>
      <div className="dropdown-list-content">
        {list.map((item: any) => <div className="dropdown-list-item" key={item.value} title={item.label} onMouseOver={() => setCurItem(item)} onMouseOut={() => setCurItem(null)}>
          <div
            className="dropdown-list-text"
            onClick={() => handleClick(item)}
          >
            {editable ? <EditableText text={item.label} onChange={(value: any) => handleItemChange(item, value)} /> : item.label}
          </div>
          {editable && <div className="dropdown-list-delete" >
            <div className="dropdown-list-delete-icon" onClick={() => handleDeleteItem(item)}>
              <Icon name={curItem?.value === item.value ? 'deleteHover' : 'delete'} />
            </div>
          </div>}
        </div>)}
      </div>
      {editable && <AddButton onAdd={handleAddOption} />}
    </div>
  ) : null
}

function DropSelect({ dataSource, showSearch, defaultValue, onChange, editable = false, editableIcon, style, className, dropClassName }: any) {

  const [childrenWidth, setChildrenWidth] = useState(0)
  const [value, setValue] = useState(defaultValue)
  const [visible, setVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [selectList, setSelectList] = useState<any[]>(dataSource || defaultData)


  const childrenRef = useRef<HTMLInputElement>(null)
  const dropboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (dropboxRef.current && childrenRef.current) {
      const childrenVal = childrenRef?.current?.getBoundingClientRect();
      setChildrenWidth(childrenVal.width)
    }
  }, [visible])

  useEffect(() => {
    if (dataSource && Array.isArray(dataSource)) {
      setSelectList(dataSource)
    }
  }, [dataSource])

  const handleSelect = (v: any) => {
    setValue(v.label)
    setVisible(false)
    onChange && onChange(v)
  }

  const handleMouseUp = (e: any) => {
    setIsClicked(false)
    setVisible(!visible)
    // TODO: query select list or 
    // setSelectList()
  }

  const handleSetList = () => {

  }

  const renderDropList = () => {
    return (
      <DropList
        list={selectList}
        onSelect={handleSelect}
        setList={handleSetList}
        editable={editable}
        editableIcon={editableIcon}
        dropClassName={dropClassName}
      />
    )
  }

  const renderSelectedBox = (
    <div ref={childrenRef} className={classNames("drop-container", `${editable ? 'editable' : ''}`, className)} style={style}>
      <div className={classNames("drop-content", `${editable ? 'editable' : ''}`)}>
        {showSearch ? <Search /> : <div className="drop-value" title={value}>
          {value}
        </div>}
        <div
          className={`drop-down-button ${isClicked ? 'clicked' : ''}`}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={handleMouseUp}
        >
          <ArrowIcon />
        </div>
      </div>
      {
        visible && renderDropList()
      }
    </div>
  )

  return (
    editable ? renderSelectedBox : <Tooltip
      overlay={renderDropList()}
      isSelect={true}
      visible={visible}
      placement="bl"
      defaultWidth={true}
    >
      <div ref={childrenRef} className={classNames("drop-container", `${editable ? 'editable' : ''}`)} style={style}>
        <div className={classNames("drop-content", `${editable ? 'editable' : ''}`)}>
          {showSearch ? <Search /> : <div className="drop-value" title={value}>
            {value}
          </div>}
          <div
            className={`drop-down-button ${isClicked ? 'clicked' : ''}`}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={handleMouseUp}
          >
            <ArrowIcon />
          </div>
        </div>
      </div>
    </Tooltip>

  );
}

export default DropSelect;

