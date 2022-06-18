import Search from 'components/common/Search';
import Tooltip from 'components/common/Tooltip';
import arrow from 'assets/svgs/arrow.svg'
import React, { useEffect, useRef, useState } from 'react';
import './index.less'
import Icon from 'components/common/Icon';
import ArrowIcon from 'components/common/ArrowIcon';

export interface SelectProps {
  IRList?: any[]
}
const DropList = ({ list, onSelect }: any) => {
  const handleClick = (item: any) => {
    onSelect && onSelect(item)
  }

  return list.length > 0 ? (
    <div className="accessories-dropdown-list-wrap">
      <div className="accessories-dropdown-list-content">
        {list.map((item: any) => <div className="accessories-dropdown-list-item" key={item.key} onClick={() => handleClick(item)} title={item.name}>
          <div className="accessories-dropdown-list-text">{item.name}</div>
        </div>)}
      </div>
    </div>
  ) : null
}

function Select({ dataSource, showSearch, defaultValue, onChange, style }: any) {

  const [childrenWidth, setChildrenWidth] = useState(0)
  const [value, setValue] = useState(defaultValue)
  const [visible, setVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [selectList, setSelectList] = useState<any[]>([])

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
    console.log('----v：', onChange)
    setValue(v.name)
    setVisible(false)
    onChange && onChange(v)
  }

  const handleMouseUp = (e: any) => {
    setIsClicked(false)
    setVisible(!visible)
  }

  return (
    <Tooltip
      overlay={<DropList
        ref={dropboxRef}
        list={selectList}
        width={childrenWidth}
        onSelect={handleSelect}
      />}
      isSelect={true}
      visible={visible}
    >
      <div ref={childrenRef} style={style} className="accessories-drop-container">
        <div className="accessories-drop-content">
          <div className="accessories-drop-value" title={value}>
            {value}
          </div>
          <div
            className={`accessories-drop-down-button ${isClicked ? 'clicked' : ''}`}
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

export default Select;


