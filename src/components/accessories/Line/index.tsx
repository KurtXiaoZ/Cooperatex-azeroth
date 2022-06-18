import React from 'react';
import { Node } from '../../../interface'
import './index.less'


function Line({ style }: Node) {
  return (
    <div 
      className="accessory-element-line"
      style={style}
    >
    </div>
  );
}

export default Line;
