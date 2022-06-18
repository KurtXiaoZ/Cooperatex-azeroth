import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import './index.less'

function Checkbox({ label,children, active, value, onClick }: any) {
  const [isActive, setIsActive] = useState(active === value)
  useEffect(() => {
    setIsActive(active === value)
  }, [active, value])
  const handleClick = () => {
    setIsActive(!isActive)
    onClick && onClick(active)
  }
  return (
    <div className="checkbox-wrap" >
      <div className="left">
        <input type="checkbox" className={`checkbox-input ${isActive ? 'active' : ''}`} onClick={handleClick} />
      </div>
      {(label || children) && <div className={`label ${isActive ? 'active' : ''}`} >{label || children}</div>}
    </div>
  );
}

export default Checkbox;
