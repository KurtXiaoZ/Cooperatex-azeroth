import React from 'react';
import Icon from 'components/common/Icon';
import './index.less'

function Alignment({ curElement = {}, onChange }: any) {
  const { style = {} } = curElement

  const alignList = [
    {
      key: 'left',
      styleValue: 'left',
      icon: 'verticallyLeft'
      // icons: ['left', 'left'],
    },
    {
      key: 'verticallyCenterAlign',
      styleValue: 'verticallyCenterAlign',
      icon: 'verticallyCenterAlign'
      // icons: ['left', 'left'],
    },
    {
      key: 'right',
      styleValue: 'right',
      icon: 'verticallyRight'
      // icons: ['left', 'left'],
    },
    {
      key: 'bottom',
      styleValue: 'bottom',
      icon: 'bottomAlign'
      // icons: ['left', 'left'],
    },
    {
      key: 'horizontalCenter',
      styleValue: 'horizontalCenter',
      icon: 'horizontalCenterAlign'
      // icons: ['left', 'left'],
    },
    {
      key: 'top',
      styleValue: 'top',
      icon: 'topAlign'
      // icons: ['left', 'left'],
    },
  ]

  const handleAlignClick = (alignKey: string, value: string) => {
    // console.log('------------style:', style)
    // console.log('------------value:', value)
    let alignStyle: any = {};

    switch (alignKey) {
      case 'left':
        alignStyle = {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start'
        }
        break;
      case 'verticallyCenterAlign':
        alignStyle = {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }
        break;
      case 'right':
        alignStyle = {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'end'
        }
        break;
      case 'bottom':
        alignStyle = {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }
        break;
      case 'horizontalCenter':
        alignStyle = {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }
        break;
      case 'top':
        alignStyle = {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }
        break;
      default:
        break;
    }


    value && onChange && onChange({
      style: {
        ...style,
        display: 'flex',
        ...alignStyle,
      }
    })
  }
  return (
    <div className="alignment-card-content">
      {alignList.map(({ key, styleValue, icon }) => <Icon onClick={() => handleAlignClick(key, styleValue)} name={icon} key={key} style={{ width: 14 }} />)}
    </div>
  );
}
export const controlTitle: string = 'Alignment'

export default Alignment;
