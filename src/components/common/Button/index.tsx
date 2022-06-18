import React, { CSSProperties, useMemo, useState } from 'react';
import './index.less';

interface IProps {
  type?: 'primiry' | 'default' | 'link' | 'disabled';
  children: any;
  onClick?: (e: any) => any;
  style?: CSSProperties
}

function Button({ type = 'default', children, onClick, style }: IProps) {
  const [clicked, setClicked] = useState(false)

  const cls = useMemo(() => {
    if (clicked) return `custom-${type}-button custom-${type}-button-clicked`;
    return `custom-${type}-button`
  }, [type, clicked])

  const handleClick = (e: any) => {
    onClick && onClick(e);
  }
  return (
    <button
      className={`custom-button ${cls}`}
      onClick={handleClick}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      style={style}
    >
      <span className="button-text">{children}</span>
    </button>
  );
}

export default Button;   