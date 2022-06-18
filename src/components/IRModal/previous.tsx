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
  const { ruleId: id, ruleName: name } = IRData[0]
  const [data, setData] = useState<any>({
    type: 'input',
    transfers: 'RCH to Pools',
    receives: 'BTC to Pool2',
    ranges: [0, 100],
    coin: 'BTC',
    startTime: '2021.11.10 10:38',
    endTime: '2021.11.11 10:38'
  })

  const [styleType, setStyleType] = useState('keyboard')
  const [shareList, setShareList] = useState([
    {
      name: IRData.name,
      key: IRData.name
    }
  ])
  const [isShares, setIsShares] = useState(shareList.length > 1)

  const [isNext, setIsNext] = useState(true)
  const [chooseVisible, setChooseVisible] = useState(false)
  const [sameRules, setSameRules] = useState<any>([])


  useEffect(() => {
    if (id) {
      // TODO: get IR data
      // setData()
    }
  }, [id])

  useEffect(() => {
    if (!isShares) {
      setShareList([...shareList.filter((i, idx) => idx === 0)])
    } else {
      shareList.push({
        name: '',
        key: new Date().valueOf()
      })
    }
  }, [isShares])

  const handleCheckShares = (v: any) => {
    setIsShares(!isShares)

  }

  const handleInboxChange = (style: any, ir: any) => {
    const newList = shareList.map((shareIr: any) => {
      if (ir.key === shareIr.key) {
        return {
          ...shareIr,
          inboxStyle: style
        }
      }
      return shareIr
    })
    setShareList(newList)
  }


  const handleDropboxChange = (v: any) => {



  }

  const handleChangeIRName = (val: any) => {
    console.log('--------val:', val)

  }

  const handleDone = () => {
    console.log('---------to handle modal done')
    onDone && onDone({
      ...IRData,
      hasFinished: true,
      hasShares: isShares,
      IRList: shareList,
      inboxStyle: styleType
    })
    onClose();
  }

  const handleChoose = (IRs: any) => {
    console.log('-----------IR:', IRs)
    setChooseVisible(false);
    setSameRules(IRs)
  }
  return (
    <div className="IR-modal-container">

      <div className="IR-modal-content">
        <p style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 10
        }}>
          {isNext ? name : `Edit Rule: ${name}`}
          {/* <Icon name={'up'} onClick={onClose} /> */}
          <span onClick={onClose} >x</span>
        </p>
        {sameRules.length ? <SameRuleList list={sameRules} /> : null}
        {!isNext && <div style={{
          maxHeight: 200,
          overflow: 'auto',
          margin: '8px 0'
        }}>
          <div>
            <IrDetail data={{
              illustrate: IRData[0], scenarios: IRData[1] || [], accessibleData: isNext ? [
                {
                  "accessibleId": "7119054944453",
                  "accessible": [
                    {
                      "restrictionType": "2",
                      "condition": {
                        "conditionId": "7129709136453",
                        "duration": 200,
                        "timeType": "3"
                      }
                    }
                  ]
                }
              ] : null
            }} />

            {shareList.map((shareRule: any) => <div className="IR-inbox-style" key={shareRule.key}>
              <h3 style={{ margin: '8px 0' }}>Inbox style: </h3>
              <RadioGroup onChange={(v: any) => handleInboxChange(v, shareRule)} active={shareRule.inboxStyle || 'keyboard'} style={{
                display: 'flex',
                // marginLeft: 12
              }}>
                <Radio value="dropbox">Drop down box</Radio>
                <Radio value="keyboard">Keyboard input</Radio>
              </RadioGroup>
              {shareRule.inboxStyle === 'dropbox' && <div style={{ margin: '8px 0px' }}>
                {/* <DropSelect onChange={handleDropboxChange} editable={true} /> */}
                <AddDropDownValue />
              </div>}
            </div>)}
          </div>
        </div>}

      </div>

      <div className="modal-footer">
        <div>
          {!isNext && <AddButton text="Merge same type IRs" onAdd={() => setChooseVisible(true)} />}
        </div>
        {isNext ? <Button type="primiry" onClick={() => setIsNext(false)}>Next</Button> : <Button type="primiry" onClick={handleDone}>Done</Button>}
      </div>

      {
        chooseVisible && <ChooseSameIRModal visible={chooseVisible} onClose={() => setChooseVisible(false)} onChoose={handleChoose} />
      }
    </div>
  );
}

export default IrModal;
