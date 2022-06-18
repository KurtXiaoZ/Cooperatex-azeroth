import React from 'react';
import { Node } from '../../../interface';
import './index.less';

export interface DataProps {

}

function Data({style, children, originProps = {

} }: Node) {
  return (
    <div 
      className="accessory-element-data"
      style={style}
    >
      Data
    </div>
  );
}

export default Data;


