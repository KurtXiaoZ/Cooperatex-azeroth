import InputNumber from 'components/common/InputNumber';
import React, { useState } from 'react';
import './index.less'

function BorderSetter({value, onChange}: any) {

  const { borderStyle, borderWidth } = value

  const [solidChecked, setSolidChecked] = useState(borderStyle === 'solid')
  const [dashedChecked, setDashedChecked] = useState(borderStyle === 'dashed')


  const handleChange = (val: any, propName: string) => {
    console.log('-------------propName, val:', propName, val)
    onChange && onChange({
      ...value,
      [propName]: val
    })
  }

  const handleStyleClick = (style: string) => {
    if (style === 'solid') {
      setSolidChecked(true);
      setDashedChecked(false);

    } else {
      setSolidChecked(true);
      setDashedChecked(false);
    }
    handleChange(style, 'borderStyle')
  }


  return (
    <div className="border-width-setter">

      <div className="border-width-icons">

        <div 
          className={`border-width-icon solid ${solidChecked? 'checked' : ''}`} onClick={() => {
            handleStyleClick('solid')
            // setSolidChecked(true);
            // setDashedChecked(false);
          }}
        >
          <div className="solid-border" />
        </div>

        <div className={`border-width-icon dashed ${dashedChecked? 'checked' : ''}`} onClick={() => {
            handleStyleClick('dashed')

          // setSolidChecked(true);
          // setDashedChecked(false);
        }}>
          <div className="solid-border" />
        </div>

      </div>
      

      <div className="border-width-value">

        <span>
          Border Width
        </span>

        <InputNumber style={{width: 47}} value={borderWidth} onChange={(value: any) => handleChange(value, 'borderWidth')}/>

      </div>

      








      {/* <div className={`border-width-icon dashed ${dashedChecked? 'checked' : ''}`} onClick={() => {
        setSolidChecked(false);
        setDashedChecked(true);
      }}>
        <div className="dashed-border" />
      </div> */}


    </div>
  );
}

export default BorderSetter;
