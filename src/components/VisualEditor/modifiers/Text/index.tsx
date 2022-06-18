import React, { useState } from 'react';
import Select from '../../../common/Select'
import InputNumber from '../../../common/InputNumber';
import Icon from '../../../common/Icon';
import DropSelect from 'components/common/DropSelect';
import './index.less';

const textAlignProps = [
  {
    key: 'textAlign',
    styleValue: 'left',
    icons: ['leftAlign', 'leftAlignClicked']
  },
  {
    key: 'textAlign',
    styleValue: 'center',
    icons: ['center', 'centerClicked']
  },
  {
    key: 'textAlign',
    styleValue: 'right',
    icons: ['rightAlign', 'rightAlignClicked']
  },
]

const textStatusProps = [
  {
    key: 'fontStyle',
    styleValue: 'italic',
    icons: ['italic', 'italicClicked'],
  },
  {
    key: 'textDecoration',
    styleValue: 'line-through',
    icons: ['deleteLine', 'deleteLineClicked']
  },
  {
    key: 'textDecoration',
    styleValue: 'underline',
    icons: ['underscore', 'underscoreClicked']
  },
]

const fontWeightData = [
  {
    label: 'Regular',
    value: 'normal',
  },
  {
    label: 'Bold',
    value: 'bold',
  },
  {
    label: 'Medium',
    value: 'bolder',
  },
  {
    label: 'Light',
    value: 'lighter',
  },
]
function Text({ curElement = {}, onChange }: any) {

  const { style } = curElement;

  const fontSize = style?.fontSize || 12;


  const handleTextAlignClick = (key: string, value: string) => {
    onChange && onChange({
      style: {
        ...style,
        [key]: value
      }
    })
  }
  return (
    <div className="text-content">
      <DropSelect dropClassName="text-select-option" dataSource={fontWeightData} style={{ width: '100%' }} onChange={(textFont: string) => handleTextAlignClick('fontFamily', textFont)} />
      <div className="text-align">
        <DropSelect dropClassName="text-select-option" dataSource={fontWeightData} onChange={(weight: string) => handleTextAlignClick('fontWeight', weight)} />
        <InputNumber
          style={{ width: '30%' }}
          value={fontSize}
          defaultValue={fontSize}
          onChange={(value: any) => handleTextAlignClick('fontSize', value)}
        />
      </div>
      <div className="text-align">
        <div className="text-align-blocker">
          {textAlignProps.map(({ key, styleValue, icons }) => <Icon onClick={() => handleTextAlignClick(key, styleValue)} name={icons[0]} imgs={icons} key={styleValue} style={{ marginRight: 8 }} />)}
        </div>
        <div className="text-align-blocker">
          {textStatusProps.map(({ key, styleValue, icons }) => <Icon onClick={() => handleTextAlignClick(key, styleValue)} name={icons[0]} imgs={icons} key={styleValue} style={{ marginRight: 8 }} />)}
        </div>
      </div>
    </div>
  );
}

export default Text;
