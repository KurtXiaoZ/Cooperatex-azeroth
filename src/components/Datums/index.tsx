import React from "react";
import './index.less'

interface IProps {
  hor: number[],
  ver: number[]
}
const Datums = (props: IProps) => {
  return (
    <>
      {props.hor.map((i, index) => <Hor key={index} top={i} />)}
      {props.ver.map((i, index) => <Ver key={index} left={i} />)}
    </>
  )
};

export default Datums;


const Hor = (props: {top: number}) => {
  return <div className="datum_hor" style={{ top: props.top }}></div>
};

const Ver = (props: {left: number}) => {
  return <div className="datum_ver" style={{ left: props.left }}></div>
};
