import React, { useMemo } from 'react';
import { Node } from '../../../interface'
import './index.less'
export interface ShapeProps {
  shape?: 'rectangle' | 'triangle' | 'circle' | 'pentagon' | 'hexagon' | 'octagon' | 'star';
}

function Shape({ originProps, style, }: Node) {
  const shape = originProps?.shape || ''

  const cls = useMemo(() => {
    if (shape) return `${shape}`;
    return 'rectangle'
  }, [shape])
  return (
    <div >
      <div
        className={`accessory-element-shape ${cls}`}
        style={style}
      >
      </div>
    </div>

  );
}

export default Shape;
