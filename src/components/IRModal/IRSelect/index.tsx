import Search from 'components/common/Search';
import Tooltip from 'components/common/Tooltip';
import React, { useState } from 'react';
import cls from "classnames";
import './index.less'

export const SearchSelect = ({ list: defaultList, onSelect, className, ...restProps }: any) => {
  const [list, setList] = useState(defaultList);

  const handleSearchList = (val: any) => {
    if (val) {
      setList([
        {
          name: 'rule1',
          key: 'rule1'
        },
        {
          name: 'rule2',
          key: 'rule2'
        },
        {
          name: 'rule3',
          key: 'rule3'
        },
      ])
    } else {
      setList([])
    }
  }

  const handleSelect = (i: any) => {
    onSelect && onSelect(i)
  }
  return (
    <div className={cls("dropdown-select-wrap", className)} style={{
      // width,
    }}>
      <Search onChange={handleSearchList} style={{
        height: '32px'
      }}  {...restProps} />
      <div className="dropdown-select-list">
        {list.map((item: any) => <div className="dropdown-select-item" onClick={() => handleSelect(item)}>
          {item.name}
        </div>)}
      </div>
    </div>
  )
}

function IRSelect({ children, visible, ruleList, onChange }: any) {

  const handleChange = (v: any) => {
    onChange && onChange(v)
  }
  return visible ? (
    <Tooltip
      overlay={<SearchSelect list={ruleList || []} onSelect={handleChange} />}
      isSelect={true}
      visible={visible}
      placement="lt"
      defaultWidth
    >
      {children || null}
    </Tooltip>
  ) : children || null;
}

export default IRSelect;
