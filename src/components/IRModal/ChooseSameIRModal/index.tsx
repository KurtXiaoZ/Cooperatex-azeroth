import React, { useCallback, useState } from 'react';
import Dialog from "components/common/Dialog";
import Search from 'components/common/Search';
import Button from 'components/common/Button';
import './index.less'
import { getIrSearchList } from 'services/past';

const ChooseSameIRModal = ({ visible, onClose, onChoose }: any) => {

  const [list, setList] = useState<any[]>([])

  const [sameRules, setSameRules] = useState<any[]>([])
  const isSelceted = useCallback((curI: any) => {
    return sameRules.find((ir: any) => (curI.ruleId === ir.ruleId))
  }, [sameRules])

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
    const selectRules = [...sameRules]
    selectRules.push(i)
    setSameRules(selectRules)
  }
  return <Dialog
    title={'Search IR'}
    visible={visible}
    onClose={onClose}
    theme="dark"
    open={visible}
    footer={[
      <Button type={"primiry"} onClick={() => onChoose(sameRules)}>Done</Button>
    ]}
    style={{
      width: 462,
      height: 372
    }}
  >
    <div className='ir-search-wrap'>
      <Search onChange={handleSearchList} placeholder="Input IR Name" showSearch style={{
        height: '32px'
      }} />
      <div className="ir-search-list">
        {list.map((item: any) => (
          <div key={item.systemId}>
            <h5 >{item.systemName}</h5>
            {item.rules.map((rule: any) =>
              <div className={`search-ir-item ${isSelceted(rule) ? 'selected' : ''}`} key={rule.ruleId} onClick={() => handleSelect(rule)}>
                {rule.ruleName}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </Dialog >
}

export default ChooseSameIRModal


