import React, { useState } from 'react';
import { IllustrateContent } from '..';
import './index.less'


const EditableRule = ({ rule, isSelected }: any) => {


  const { illustrate = [

  ] } = rule
  return <div className={`rule-detail-item ${isSelected ? 'selected' : ''}`}>
    <IllustrateContent illustrate={illustrate} />
  </div>
}



const SameRuleList = ({ list }: any) => {

  const [curRule, setCurRule] = useState<any>(list[0])

  return <div className='same-rule-list-wrap'>
    {
      (list || []).map((rule: any) => {
        return <EditableRule rule={rule} isSelceted={curRule?.ruleId === rule.ruleId} />
      })
    }
  </div>
}

export default SameRuleList