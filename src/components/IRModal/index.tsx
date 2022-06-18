import React, { useEffect, useMemo, useState } from 'react';
import './index.less'
import Radio from 'components/common/Radio';
import RadioGroup from 'components/common/Radio/RadioGroup';
import Button from 'components/common/Button';
import { symbolMap, thenTypeMap, timeTypeMap, whenTypeMap } from './config';
import AddDropDownValue from './AddDropDownValue';
import AddButton from 'components/common/AddButton';
import ChooseSameIRModal from './ChooseSameIRModal';
import SameRuleList from './SameRuleList';

export const IllustrateContent = ({ illustrate }: any) => {
  const { whenType, when = {}, thenType, then, change = [] } = illustrate;
  const { originType, origin, targetType, target } = when;

  const whenEvent: { [key: string]: string } = useMemo(() => {
    let origin = '', targets = '';
    if (whenType === '3') {
      if (when.origin) {
        origin = when.origin.codename
      }

      if (when.target) {
        targets = when.target.map((t: any) => `${t.systemName} ${t.poolName} ${t.percent}%`).join(' and ')
      }
    }

    return {
      origin,
      targets
    }

  }, [])

  const thenEvent: { [key: string]: string } = useMemo(() => {
    let asset = '', middle = '', destination = '', suffix = '', dataType = '';

    switch (thenType) {
      case '3':
        if (then.origin) {
          asset = then.origin.codename;
          destination = `${then.target.systemName} ${then.target.poolName} ${then.target.percent}%`
        }
        middle = 'to';
        break;
      case '4':
        if (then.origin) {
          asset = then.origin.codename;
          middle = 'from';
          destination = `${then.origin.systemName} ${then.origin.poolName}`
        }
        break;
      case '5':
        dataType = then.variableName;
        break;
      case '6':
        asset = then.codename;
        suffix = "from the user's address";
        break;
    }
    return {
      asset,
      dataType,
      middle,
      destination,
      suffix
    }
  }, [])


  return (
    <div>
      <div className="rules-detail">When the user {whenTypeMap[whenType]} {Object.keys(whenEvent).map((key: string) => whenEvent[key]).join(' to ')}, {thenTypeMap[thenType]} {Object.keys(thenEvent).filter(i => !!i).map((key: string) => thenEvent[key]).join(' ')}</div>
      <div>
        {then?.change?.length > 0 && then?.change.map((changeDataType: any) => (
          <span>change {changeDataType.variableName}</span>
        ))}
      </div>
    </div>
  )
}

const ScenarioContent = ({ scenario, whenType, thenType, coinName }: any) => {
  const { scenarioType, range = {}, restriction, formula } = scenario;
  const { rangeType, startSymbol, minType, minValue, maxType, maxValue, endSymbol } = range;

  const userAction = useMemo(() => {
    if (thenType === '4') return 'received'
    if (thenType === '3') return 'transfer'
    else return ''
  }, [])

  return (
    <>
      {scenarioType !== '2' && (<div>Range of <span className="rule-type">User Input Value</span> = {symbolMap[startSymbol]} {minValue}, {maxValue} {symbolMap[endSymbol]}</div>)}
      {thenType !== '6' && <div>Amount of {coinName} user {userAction} = {scenarioType !== '2' && <span className="rule-type">UIV * </span>}{formula}</div>}
    </>
  )

}

const AccessibleContent = ({ accessible }: any) => {
  const { restrictionType, condition = {} } = accessible;
  const accessibleEvent: { [key: string]: string } = useMemo(() => {
    let prefix = '', origin = '', middle = '', destination = '', suffix = '';

    switch (restrictionType) {
      case '1': // custom cycle
        const { cycleTime, callTimes } = condition;
        origin = callTimes;
        middle = 'time for each user every';
        destination = cycleTime;
        suffix = 'days'
        break;
      case '2':
        const { timeType, duration } = condition;
        prefix = 'when time is within';
        origin = `${duration} ${timeTypeMap[timeType]}`;
        suffix = 'after the launch of the app'
        break;
      case '3':
        prefix = 'from';
        origin = condition.startTime;
        middle = 'to';
        destination = condition.endTime
        break;
      case '4': // tag
        prefix = 'when the user owner';
        destination = condition.tagName;
        break;
      case '5':
        const { variableName, rangeType, startSymbol, minValue, maxValue, endSymbol } = condition;
        prefix = 'when';
        origin = variableName;
        middle = rangeType === '1' ? 'is in the range' : 'is in the set';
        destination = `${symbolMap[startSymbol]}${minValue}, ${maxValue}${symbolMap[endSymbol]}`;
        break;
    }
    return {
      prefix,
      origin,
      middle,
      destination,
      suffix
    }
  }, [])


  return (
    <>
      {<span>
        {Object.keys(accessibleEvent).filter(i => !!i).map((key: string) => accessibleEvent[key]).join(' ')}
      </span>}
    </>
  )

}

export const IrDetail = React.memo(({ data: { illustrate, scenarios = [], accessibleData = [

] } }: any) => {

  return (
    <div className="IR-rules-container" >
      <div className="rules-detail">
        {/* {accessibleData && <p>
          Rules
        </p>} */}
        <IllustrateContent illustrate={illustrate} />
        {scenarios.map((scenario: any) => <ScenarioContent scenario={scenario} thenType={illustrate.thenType} coinName={'BTC'} />)}
      </div>
      {accessibleData && <div className="rules-detail">
        <p>
          Accessibility
        </p>

        {accessibleData.map((data: any) => (data?.accessible || []).map((accessible: any) => <AccessibleContent accessible={accessible} />))}

      </div>}
    </div>
  )
})


function IrModal({ IRData, onClose, onDone }: any) {
  return (
    <div className="IR-modal-container">
      <div className="IR-modal-header">
        title
      </div>
      <div className="IR-upper-content">
        When afdsafhoiwanefoibwaovbnoiwaebnvoiabwoivoaweiob

      </div>
      <div className='IR-lower-accessibility'>

      </div>

      

      <div className="modal-footer">
      </div>
    </div>
  );
}

export default IrModal;