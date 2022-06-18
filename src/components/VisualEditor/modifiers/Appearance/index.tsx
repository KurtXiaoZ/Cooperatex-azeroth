import React, { useEffect, useMemo, useState } from 'react';
import ColorSetter from '../../setters/ColorSetter';
import SliderSetter from '../../setters/SliderSetter'
import RadiusSetter from '../../setters/RadiusSetter'
import BorderSetter from '../../setters/BorderSetter'
import './index.less';

function Appearance({ curElement = {}, onChange, elementSetters }: any) {

  const { style = {}, type } = curElement;

  const { opacity = 1, borderRadius = 1, background = "#ffffff", color = '#000000', border = '0px solid #ffffff', } = style;

  const { borderWidth, borderColor } = useMemo(() => {
    if (border) {
      const borderParams = border.split(' ');

      const width = borderParams.find((str: string) => new RegExp('px').test(str))

      const style = borderParams.find((str: string) => new RegExp(/solid|dash/).test(str))

      const color = borderParams.find((str: string) => !(new RegExp(/solid|dash|px/).test(str)))

      return {
        borderWidth: {
          borderWidth: parseInt(width),
          borderStyle: style
        },
        borderColor: color
      }

    }
    return {
      borderWidth: {
        borderWidth: 0,
        borderStyle: 'solid'
      },
      borderColor: '#ffffff'
    }
  }, [border])

  const handleStyleChange = (styleProperty: any) => {
    let borderStyleProperty = styleProperty
    if (!style?.border && style?.border === 'none') borderStyleProperty = {
      'border': `${borderWidth.borderWidth} ${borderWidth.borderStyle} ${borderColor}`,
      ...styleProperty
    }

    onChange && onChange({
      style: {
        ...style,
        ...borderStyleProperty
      }
    });
  }

  const handleOpacityChange = (value: number) => {
    handleStyleChange({ 'opacity': value })
  }

  const handleBackgroundChange = (value: any) => {
    const colorStyle = type === 'text' ? 'color' : 'background'
    handleStyleChange({
      [colorStyle]: value.color
    })
  }
  const handleBorderColorChange = (value: any) => {
    handleStyleChange({
      borderColor: value.color
    })
  }

  const handleBorderRadiusChange = (value: any) => {
    handleStyleChange(value)
  }
  const handleBorderWidthChange = (value: any) => {
    handleStyleChange(value)
  }
  return (
    <div className="appearance-card-content">
      <SliderSetter title="Opacity" unit="%" value={opacity} onChange={handleOpacityChange} />

      <ColorSetter colorType="Fill Color" value={(type === 'text' ? color : background)} onChange={handleBackgroundChange} />
      {elementSetters?.includes('BorderColor') && <ColorSetter colorType="Border Color" value={borderColor} onChange={handleBorderColorChange} />}

      {elementSetters?.includes('BorderSetter') && <BorderSetter value={borderWidth} onChange={handleBorderWidthChange} />}

      {elementSetters?.includes('BorderRadius') && <div className="appearance-item">
        <span>Radius</span>
        <div className="appearance-item-value">
          <RadiusSetter value={borderRadius} onChange={handleBorderRadiusChange} />
        </div>
      </div>}

    </div>
  );
}

export default Appearance;


