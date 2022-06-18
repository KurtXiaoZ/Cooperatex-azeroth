import React, { useEffect, useState } from 'react';
import Icon from 'components/common/Icon';
import Search from 'components/common/Search';
import up from 'assets/svgs/up.svg'
import Div from 'components/accessories/Div';
import IRSelect from '../IRSelect';



function IRNameInput({ onChange, list: defaultShareList, setList }: any) {

  const [shareList, setShareList] = useState(defaultShareList)
  const [isDropSelect, setIsDropSelect] = useState(false)
  const [curIr, setCurIr] = useState<any>(null)


  useEffect(() => {
    setList([...shareList])
  }, [shareList])

  const handleAddOption = () => {
    const isOnlyOneIrUnnamed = shareList.filter((i: any, idx: number) => idx === shareList.length - 1 && !i.name).length;
    if (isOnlyOneIrUnnamed < 1) {
      shareList.push({
        name: '',
        key: new Date().valueOf().toString()
      })
      setShareList([...shareList])
    }
  }

  const handleSelectIR = (Ir: any) => {
    !isDropSelect ? setCurIr(Ir) : setCurIr(null)
    setIsDropSelect(!isDropSelect)
  }

  const handleSelectChange = (v: any) => {
    const newShareList = shareList.map((shareIR: any) => {
      if (curIr.key === shareIR.key) {
        return v
      }
      return shareIR
    })
    setShareList(newShareList)
    setIsDropSelect(false)
  }

  const handleIrName = (value: any, ir: any) => {
    const newShareList = shareList.map((shareIR: any) => {
      if (ir.key === shareIR.key) {
        return {
          ...shareIR,
          name: value
        }
      }
      return shareIR
    })
    setShareList(newShareList)
  }

  return (
    <div>
      {shareList.map((item: any) => (
        <div
          key={item.name}
          style={{
            display: 'flex',
            margin: '0 12px 8px',
          }}
        >
          <div style={{
            width: 246
          }}>
            <Search
              showSearch
              value={item.name || 'option'}
              onChange={(val: any) => handleIrName(val, item)}
            />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '0 8px'
          }}>
            <Icon name={'up'} iconStyle={{
              transform: "rotate(90deg)"
            }} />
          </div>
          {item.name ? <div style={{
            width: 176,
            padding: '7px 24px',
            background: `${item.name ? '#A877C8' : ''}`,
            color: `${item.name ? '#ffffff' : '#9b9b9b'}`,
            borderRadius: 3,
            border: `1px solid ${item.name ? '#A877C8' : '#9b9b9b'}`
          }}>
            {item.name}
          </div>
            : <IRSelect ruleList={[]} visible={isDropSelect} onChange={handleSelectChange}>
              <div
                style={{
                  width: 176,
                  padding: '7px 24px',
                  background: `${item.name ? '#A877C8' : ''}`,
                  color: `${item.name ? '#ffffff' : '#9b9b9b'}`,
                  borderRadius: 3,
                  border: `1px solid ${item.name ? '#A877C8' : '#9b9b9b'}`
                }}
                onDoubleClick={() => handleSelectIR(item)}
              >
                {item.name || 'Inset Interactive Rules'}
              </div>
            </IRSelect>
          }
        </div>
      ))}
      <div
        onClick={handleAddOption}
        style={{
          padding: '0 20px',
          color: '#c0ff6a',
          cursor: 'pointer',
          marginBottom: 16
        }}
      >
        + Add More Option
      </div>
    </div>
  );
}

export default IRNameInput;
