import React, { useState } from 'react';
import Dialog from "components/common/Dialog";
import Search from 'components/common/Search';
import Button from 'components/common/Button';
import './index.less'
import { getIrSearchList } from 'services/past';

const mockIrSearchList = [
  {
    "systemId": "7449103770437",
    "systemName": "test system",
    "rules": [
      {
        "ruleId": "7603872291525",
        "ruleName": "Interaction Rule#1"
      },
      {
        "ruleId": "7603873353541",
        "ruleName": "Interaction Rule#2"
      }
    ]
  },
  {
    "systemId": "7449103770437",
    "systemName": "test system",
    "rules": [
      {
        "ruleId": "7603872291525",
        "ruleName": "Interaction Rule#1"
      },
      {
        "ruleId": "7603873353541",
        "ruleName": "Interaction Rule#2"
      }
    ]
  },
  {
    "systemId": "7449103770437",
    "systemName": "test system",
    "rules": [
      {
        "ruleId": "7603872291525",
        "ruleName": "Interaction Rule#1"
      },
      {
        "ruleId": "7603873353541",
        "ruleName": "Interaction Rule#2"
      }
    ]
  },
  {
    "systemId": "7449103770437",
    "systemName": "test system",
    "rules": [
      {
        "ruleId": "7603872291525",
        "ruleName": "Interaction Rule#1"
      },
      {
        "ruleId": "7603873353541",
        "ruleName": "Interaction Rule#2"
      }
    ]
  },
]

const SearchIrModal = ({ visible, onClose, onSelect }: any) => {

  const [list, setList] = useState<any[]>([])

  const handleSearchList = (val: any) => {
    if (val) {
      getIrSearchList(val).then((resData: any) => {
        if (resData && Array.isArray(resData)) {
          setList(resData || [])
        }
      })
    } else {
      setList([])
    }
  }

  const handleSelect = (i: any) => {
    onSelect && onSelect(i)
  }
  return <Dialog
    title={'Search IR'}
    visible={visible}
    onClose={onClose}
    theme="dark"
    open={visible}
    footer={[
      <Button type="primiry" onClick={onClose}>Done</Button>
    ]}
    style={{
      width: 462,
      height: 372
    }}
  >
    <div className='ir-search-wrap'>
      <Search onChange={handleSearchList} showSearch style={{
        height: '32px'
      }} />
      <div className="ir-search-list">
        {list.map((item: any) => (
          <div key={item.systemId}>
            <h5 >{item.systemName}</h5>
            {item.rules.map((rule: any) =>
              <div className="search-ir-item" key={rule.ruleId} onClick={() => handleSelect(rule)}>
                {rule.ruleName}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  </Dialog >
}

export default SearchIrModal


