import React from 'react';
import ColorSetter from '../../setters/ColorSetter';
import { StoreContext, withStore } from 'store';
import './index.less'

function Background({ store }: any) {
  const handleChange = (value: any) => {
    value && StoreContext.setCanvasBackground(value.color)
  }
  return (
    <div className="background-card-content">
      <ColorSetter colorType="Fill" value={store.state?.canvasBackground} onChange={handleChange} />
    </div>
  );
}

export default withStore(Background);
