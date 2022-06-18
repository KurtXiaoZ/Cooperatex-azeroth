import React, { useMemo, useState } from 'react';
import { Node } from '../../../interface'
import './index.less';

export type buttonType = 'primiry' | 'default' | 'link';

export interface ButtonProps {
  buttonType?: buttonType;
  buttonText?: string;
}

function Button({ style, children, originProps = {}, events }: Node) {
  const { buttonType: type, buttonText = "button" } = originProps
  const [clicked, setClicked] = useState(false)

  const cls = useMemo(() => {
    if (clicked) return `accessory-element-${type}-button accessory-element-${type}-button-clicked`;
    return `accessory-element-${type}-button`
  }, [type, clicked])

  const handleClick = (e: any) => {
    // clickEvent && clickEvent(e);
  }

  return (
    <button
      className={`accessory-element-button ${cls}`}
      onClick={handleClick}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      style={style}
    >
      <span className="button-text">{buttonText}</span>
    </button>
  );
}

export default Button;   