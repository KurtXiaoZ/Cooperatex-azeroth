import React, { useEffect, useMemo, useState } from 'react';
import Icon from 'components/common/Icon';
import { patterns } from 'utils/constants'
import './index.less'

const ValueChange = ({ label, defaultValue, value, content, onChange, pattern = 'number' }: any) => {

  const reg = new RegExp(pattern ? patterns[pattern] : '')

  const [isWarning, setIsWarning] = useState(false)
  const handleChange = (e: any) => {
    // console.log('-------e.target.value:', e.target.value)
    if (!e.target.value || reg.test(e.target.value)) {
      setIsWarning(false)
      onChange && onChange(Number(e.target.value))
    } else {
      setIsWarning(true)
    }

  }
  return (
    <div className="position-value-change">
      {label && <span className="position-value-label">
        {label}
      </span>}
      {content ? content : <span className="position-value-input">
        <input type="text" value={value} onChange={handleChange} />
        {/* {isWarning && <div className='input-warning'>
          Just {pattern}
        </div>} */}
      </span>}
    </div>
  )
}

interface Position {
  width: number;
  height: number;
  left: number;
  top: number
}

type positionName = 'width' | 'height' | 'top' | 'left' | 'rotate' | 'transform';

const positionTLTypes: {
  label: string,
  name: string
}[] = [
    {
      label: 'X',
      name: 'left',
    },
    {
      label: 'Y',
      name: 'top',
    },
  ]

const positionWHTypes: {
  label: string,
  name: string
}[] = [
    {
      label: 'W',
      name: 'width',
    },
    {
      label: 'H',
      name: 'height',
    },
  ]

const positionTransformTypes: {
  label?: any,
  name: string,
  content?: any
}[] = [
    {
      label: <Icon name={'rotate'} style={{ width: 14, marginRight: 4 }} />,
      name: 'rotate',
    },
    // {
    //   name: 'transform',
    //   content: <div className="transform">
    //     <Icon name={'transformX'} style={{ width: 14 }} />
    //     <Icon name={'transformY'} style={{ width: 14 }} />
    //   </div>
    // },
  ]


function Position({ curElement = {}, onChange }: any) {
  const { position, size } = curElement

  const handleValueChange = (value: number, positionName: string, type: string) => {
    switch (type) {
      case 'positionWHTypes':
        onChange && onChange({
          size: {
            ...size,
            [positionName]: value
          }
        });
        break;
      case 'positionTLTypes':
        onChange && onChange({
          position: {
            ...position,
            [positionName]: value
          }
        });
        break;
      case 'positionTransformTypes':
        onChange && onChange({
          style: {
            transform: `rotate(${value}deg)`
          }
        });
        break;
      default:
        break;
    }
  }

  return (
    <div className="position-content">
      {/* size setter */}
      <div className="position-widthAndheight">
        {positionWHTypes.map(({ label, name }) => <ValueChange label={label} value={size?.[name]} key={name} onChange={(value: number) => handleValueChange(value, name, 'positionWHTypes')} />)}
      </div>
      {/* <div className="position-item-separate">
        <Icon name={'separate'} />
      </div> */}
      {/* position setter */}
      <div className="position-topAndLeft">
        {positionTLTypes.map(({ label, name }) => <ValueChange label={label} value={position?.[name]} key={name} onChange={(value: number) => handleValueChange(value, name, 'positionTLTypes')} />)}
      </div>
      {/* transform setter */}
      <div className="position-transform">
        {positionTransformTypes.map(({ label, name, content }) => <ValueChange label={label} key={name} content={content} value={position?.[name]} onChange={(value: number) => handleValueChange(value, name, 'positionTransformTypes')} />)}
      </div>
    </div>
  );
}

export default Position;