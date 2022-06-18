import React from 'react';
import Select from '../Select';
import Input from '../Input';
import Button from 'components/common/Button';

import { Node } from '../../../interface';

import './index.less'

export interface IrSelectProps {
  hasShared?: boolean,
  // IRList?: any[],
  inboxStyle?: 'keyboard' | 'dropbox' | null,
  dropDownList?: any[],
}

function IrSelect({ style, children, originProps = {
  hasShared: true,
  // IRList: [],
  inboxStyle: 'dropbox',
  dropDownList: [],
  // IRList: []
} }: Node) {
  const { hasShared, IRList, inboxStyle, dropDownList } = originProps

  const handleSelect = (v: any) => {
    console.log('-----v:', handleSelect)

  }

  const handleKeyboardChange = (value: any) => {
    console.log('----value:', value)
  }

  const handleButtonClick = () => {
    console.log('---------handleButtonClick:')
  }
  return (
    <div style={style}>
      <div
        className="accessory-ir-select"
      >

        {children}
        {/* {hasShared && <div
          className="accessory-ir-select-item"
          style={{
            width: 104,
            height: 35
          }}
        >
          <Select
            onChange={handleSelect}
            dataSource={IRList}
            defaultValue={IRList?.[0].name}
          />
        </div>}

        {inboxStyle === 'dropbox' && <div
          className="accessory-ir-select-item"
          style={{
            width: 104,
            height: 35
          }}
        >
          <Select
            onChange={handleSelect}
            dataSource={dropDownList}
            defaultValue={dropDownList?.[0].name}
          />
        </div>}

        {inboxStyle === 'keyboard' && <div
          className="accessory-ir-select-item"
        >
          <Input value={""} onChange={handleKeyboardChange} />
        </div>}

        <Button type="primiry" onClick={handleButtonClick}>Button</Button>
 */}

      </div>

    </div>

  );
}

export default IrSelect;
