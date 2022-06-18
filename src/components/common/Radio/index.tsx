import React, { useEffect, useState } from 'react';
import './index.less';

function Radio({label, active, onClick, value}: any) {
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    setIsActive(active === value)
  }, [active, value])
  const handleClick = () => {
    if (active !== value) {
      setIsActive(!isActive)
      onClick && onClick(value)
    }
  }
  return (
    <div className="radio-wrap" onClick={handleClick}>
      <div className="left">
        <div className={`circle ${isActive ? 'active' : ''}`} />
      </div>
      <div className={`label ${isActive ? 'active' : ''}`}>{label}</div>
    </div>
  );
}

export default Radio;
