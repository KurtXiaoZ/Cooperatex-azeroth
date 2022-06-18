import React, { useState } from 'react';
import ColorSetter from '../../setters/ColorSetter';
import SliderSetter from '../../setters/SliderSetter'
import './index.less'

function Shadow({ curElement = {}, onChange }: any) {
  const { style } = curElement
  const [opacity, setOpacity] = useState(0);
  const [diffusion, setDiffusion] = useState(0);
  const [shadowColor, setShadowColor] = useState('#ffffff');

  const handleShadowColorChange = (value: any) => {
    setShadowColor(value.color)
    onChange && onChange({
      style: {
        ...style,
        boxShadow: `2px 2px ${diffusion} ${value.color}`
      }
    });
  }

  const handleOpacityChange = (value: number) => {
    setOpacity(value)
  }

  const handleDiffusionChange = (value: number) => {
    setDiffusion(value * 100)

    onChange && onChange({
      style: {
        ...style,
        boxShadow: `2px 2px ${value * 100}px ${shadowColor}${opacity}`
      }
    });

  }
  return (
    <div className="shadow-card-content">
      <ColorSetter colorType="Color" value={shadowColor} onChange={handleShadowColorChange} />
      <SliderSetter title="Opacity" unit="%" value={opacity} onChange={handleOpacityChange} />
      <SliderSetter title="Diffusion" unit="px" value={diffusion} format={(v: any) => v} onChange={handleDiffusionChange} />
    </div>
  );
}

export default Shadow;
