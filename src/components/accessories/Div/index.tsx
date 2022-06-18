import { CSSProperties } from "react";
import './index.less'

interface IProps {
  style?: CSSProperties;
  children: any
}

const Div = (props: IProps) => {
  const { style, children } = props;

  return (
    <div style={style} className="accessory-element-div">
      {children}
      <div style={{
        width: 10,
        height: 10,
        backgroundColor: 'red'
      }}>
      </div>
      <div style={{
        width: 10,
        height: 10,
        backgroundColor: 'orange'
      }}>
      </div>
      <div style={{
        width: 10,
        height: 10,
        backgroundColor: 'black'
      }}></div>
    </div>
  )
}

export default Div;