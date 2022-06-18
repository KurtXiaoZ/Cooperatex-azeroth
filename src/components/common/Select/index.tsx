import React, { CSSProperties } from 'react';
import './index.less'

interface IProps {
  style?: CSSProperties
}
function Select({style}: IProps) {
  return (
    <select style={style} className="select-container">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
  );
}

export default Select;
