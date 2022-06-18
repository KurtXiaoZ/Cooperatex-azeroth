import React, { useMemo } from 'react';
import Slider from '../../../common/Slider';
import './index.less'


function SliderSetter({ title, unit, value, onChange, format }: any) {
  const inputValue = useMemo(() => {
    const vFormat = format ? format(value) : value * 100;
    return `${vFormat}${unit}`
  }, [value])

  const handleInputChange = (e: any) => {
    onChange && onChange(e.target.value)
  }

  const handleSliderChange = (sliderValue: any) => {
    onChange && onChange(sliderValue)
  }

  return (
    <div className="slider-item">
      <span>{title}</span>
      <div className="slider-item-value">
        <div className="slider-width">
          <Slider value={inputValue} defaultValue={value} onChange={handleSliderChange} />
        </div>
        <input type="text" className="slider-input" onChange={handleInputChange} defaultValue={inputValue} value={inputValue} />
      </div>
    </div>
  );
}

export default SliderSetter;
