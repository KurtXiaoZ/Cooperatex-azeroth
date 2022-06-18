import { RouteProps, withRouter } from 'App';
import React, { useState, useEffect } from 'react';
import { Node } from 'interface'

export interface TextProps {
  value?: any;
  onChange?: any
}

function Text(props: Node & RouteProps) {
  const { style, originProps, clickEvent, navigate } = props;
  const { value, onChange } = originProps || {};
  const defaultValue = 'Add a text';
  const [iValue, setIValue] = useState<any>(value || defaultValue);
  const [isReadOnly, setIsReadOnly] = useState(true)
  useEffect(() => {
    document.addEventListener('click', handleOtherClick)
    return document.removeEventListener('click', handleOtherClick)
  }, [])

  const handleOtherClick = () => {
    setIsReadOnly(true)
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    setIsReadOnly(true)
    if (clickEvent) {
      const { type, payload } = clickEvent;
      switch (type) {
        case 'link':
          navigate && navigate(payload)
      }
    }
  }

  useEffect(() => onChange && onChange(iValue), [iValue])

  const handleChange = (e: any) => setIValue(e.target.value)


  return (
    <textarea name="text"
      onChange={handleChange}
      value={iValue}
      readOnly={isReadOnly}
      onDoubleClick={() => {
        setIsReadOnly(!isReadOnly)
      }}
      onClick={handleClick}
      className={`accessory-element-text`}
      style={{
        border: 'none',
        resize: 'none',
        backgroundColor: 'transparent',
        ...style
      }} />
  )
}

export default withRouter(Text);
