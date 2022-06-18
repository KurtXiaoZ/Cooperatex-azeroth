import React, { useState } from 'react';
import Icon from 'components/common/Icon';
import './index.less'
import { withinCanvas } from 'utils/draggable';


const SystemTitle = ({ item, onTitleClick }: any) => {
  const { systemId, systemName, ruleTotal, ruleUsedTotal, } = item
  return (
    <div className="system-item" key={systemId}
      onClick={() => onTitleClick(item)}>
      <span className="system-name">{systemName}</span>
      <div className="system-finished" >
        {ruleUsedTotal}/{ruleTotal}
      </div>
    </div>
  )
}

const SystemRule = ({ rule, handleSelectRule }: any) => {
  const { ruleId, ruleName, ruleUsed } = rule;
  const [curRule, setCurRule] = useState<any>(null);
  // handler of dragging system rules
  const handleDrag = (e: any) => {
    // if the IR component is dragged into main canvas, render IRmodal
    if(withinCanvas(e.clientX, e.clientY)) {
      handleSelectRule();
    }
  }
  return (
    <div
      key={ruleId}
      className={`system-item-IR-item ${ruleUsed ? 'finished' : ''} ${curRule?.ruleId === ruleId ? 'clicked' : ''}`}
      onClick={(e) => {
        setCurRule(rule);
        e.stopPropagation();
      }}
      title={ruleName}
      onDragEnd={handleDrag}
      draggable
    >
      {ruleName}
    </div>
  )
}

function SystemSlider({ list, handleIRSelect }: any) {
  const [isExpanded, setIsExpended] = useState(false)
  const [pos, setPos] = useState<{
    firstIndex: number,
    left: number,
  }>({
    firstIndex: 0,
    left: 0,
  })

  const handleSystemClick = (val: any) => {
    setIsExpended(!isExpanded)
  }

  const handleNav = (dire: string) => {
    let { firstIndex, left } = pos;
    const speedWidth = 136;
    // if (list.length < 6) return
    if ((dire === 'left' && firstIndex >= list.length - 6) || (dire === 'right' && firstIndex <= 0)) {
      return;
    }
    if (dire === 'left') {
      left -= speedWidth;
      firstIndex += 1
    }
    if (dire === 'right') {
      left += speedWidth;
      firstIndex -= 1
    }
    setPos({
      firstIndex,
      left,
    })
  }

  const handleSelectRule = (rule: any) => {
    setIsExpended(false)
    handleIRSelect(rule)
  }
  return (

    <div className="system-slider-container" onClick={handleSystemClick}>
      <div className="system-more-arrow left">
        <Icon name={'up'}
          iconStyle={{
            transform: "rotate(270deg)",
            width: 12,
            marginTop: 5
          }}
          onClick={() => handleNav('left')}
        />
      </div>

      <div className="system-slider-content">
        <div className="system-list-content"  >
          <div className="system-title" style={{
            ...pos
          }}>
            {
              (list || []).map((item: any) => (
                <SystemTitle item={item} onTitleClick={handleSystemClick} key={item.systemId} />
              ))
            }
          </div>
        </div>
        {isExpanded &&
          <div className="system-list-content system-IR-list-content" >
            <div className="system-IR-list-container" style={{
              ...pos
            }}>
              {
                (list || []).map(({ rules, systemId }: any) => {
                  return <div className="system-item-IR" key={systemId}>
                    {(rules || []).map((rule: any) => {
                      return (
                        <SystemRule rule={rule} handleSelectRule={handleSelectRule} />
                      )
                    })}
                  </div>
                })
              }
            </div>
          </div>}
      </div >
      <div className="system-more-arrow right">
        <Icon name={'up'}
          iconStyle={{
            transform: "rotate(90deg)",
            width: 12,
            marginTop: 5
          }}
          onClick={() => handleNav('right')}
        />
      </div>
    </div>
  );
}

export default SystemSlider;
