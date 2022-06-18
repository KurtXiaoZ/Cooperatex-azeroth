import React, { useState, useRef, useEffect } from 'react';
import InputNumber from 'components/common/InputNumber';
import './index.less'

function RadiusSetter({ value = 1, onChange }: any) {

  const radiusList = useRef(new Set<string>())
  const cornerList = ['top-left', 'top-right', 'bottom-right', 'bottom-left']

  const [borderRadiusList, setBorderRadiusList] = useState<any[]>([])
  const [fullChecked, setFullChecked] = useState(true)
  const [angleChecked, setAngleChecked] = useState(false)
  const [curCorner, setCurCorner] = useState('')

  useEffect(() => {
    if (fullChecked) setBorderRadiusList([])
  }, [fullChecked])

  const handleBorderCornersRadiusValue = (cornerValue: any, corner: string) => {
    onChange && onChange({
      ...value,
      [`border-${corner}-radius`]: cornerValue
    })
  }
  const handleBorderFullRadiusValue = (fullValue: any) => {
    onChange && onChange({
      ...value,
      [`border-radius`]: fullValue
    })
  }

  const handleCheckBorder = (corner: string) => {
    setFullChecked(false)
    setAngleChecked(true)
    setCurCorner(corner)
    borderRadiusList.includes(corner) ? radiusList.current.delete(corner) : radiusList.current.add(corner)
    setBorderRadiusList([...Array.from(radiusList.current)])
  }

  const hasChecked = (corner: string) => borderRadiusList.includes(corner) ? 'checked' : 'unchecked';

  return (
    <div className="border-radius-setter">

      <div className={`border-radius-full-icon ${fullChecked ? 'checked' : ''}`} onClick={() => {
        setFullChecked(true);
        setAngleChecked(false);
      }}>
        <div className="border-radius-full" />
      </div>
      <div className={`border-radius-angle-icon ${angleChecked ? 'checked' : ''}`}>
        <div className="border-radius-box" >
          <div className="column">
            <div className={`border-radius-angle top-left ${hasChecked('top-left')}`} onClick={() => handleCheckBorder('top-left')} />
            <div className={`border-radius-angle top-right ${hasChecked('top-right')}`} onClick={() => handleCheckBorder('top-right')} />
          </div>
          <div className="column">
            <div className={`border-radius-angle bottom-left ${hasChecked('bottom-left')}`} onClick={() => handleCheckBorder('bottom-left')} />
            <div className={`border-radius-angle bottom-right ${hasChecked('bottom-right')}`} onClick={() => handleCheckBorder('bottom-right')} />
          </div>
        </div>
      </div>
      {angleChecked ? <div>
        {cornerList.map((item: string) => <InputNumber style={{ width: 40, marginRight: 8, borderColor: curCorner === item ? '#c0ff6a' : '#292929' }} defaultValue={value['borderRadius']} onChange={(value: any) => handleBorderCornersRadiusValue(value, item)} onBlur={() => setCurCorner(item)} />)}
      </div> : <InputNumber value={value['borderRadius']} style={{ width: 40 }} onChange={handleBorderFullRadiusValue} />}
    </div>
  );
}

export default RadiusSetter;
