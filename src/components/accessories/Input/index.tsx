import { CSSProperties } from "react";
import './index.less'

interface IProps {
  style?: CSSProperties;
  value: any;
  onChange?: any;
  placeholder?: any
}

const Input = (props: IProps) => {
  const { style, value, onChange, placeholder } = props;
  console.log('-------------input style:', style)

  const handleChange = (e: any) => onChange && onChange(e.target.value)

  return (
    <input type="text" onChange={handleChange} value={value} className="accessory-element-input" style={{
      ...style,
      top: 0,
      left: 0
    }} />
  )
}

export default Input;