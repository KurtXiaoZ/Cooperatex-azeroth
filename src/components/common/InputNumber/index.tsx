import React, { useEffect, useState } from 'react';
import up from 'assets/svgs/up.svg'
import down from 'assets/svgs/down.svg'
import './index.less'

function InputNumber({ style, value = 1, onChange, defaultValue = 1, ...restProps }: any) {
  const [number, setNumber] = useState(defaultValue || value)

  useEffect(() => {
    setNumber(value)
  }, [value])

  const handleChange = (e: any) => {
    setNumber(Number(e.target.value))
    onChange && onChange(Number(e.target.value))
  }

  const handleCompute = (method: string) => {
    let newNumber = number
    if (method === 'plus') {
      newNumber = number + 1
    } else {
      newNumber = number === 0 ? 0 : number - 1
    }
    setNumber(newNumber)
    onChange && onChange(newNumber)
  }
  return (
    <div className="input-number-container" style={style}>
      <input type="text" className="number-input" onChange={handleChange} value={number} {...restProps} />
      <div className="input-number-handle-wrap">
        <span className="input-number-handle input-number-handle-up" onClick={() => handleCompute('plus')}>
          <img src={up} alt={'up' || ''} />
        </span>
        <span className="input-number-handle input-number-handle-down" onClick={() => handleCompute('minus')}>
          <img src={down} alt={'down' || ''} />
        </span>
      </div>

    </div>

  );
}

export default InputNumber;
