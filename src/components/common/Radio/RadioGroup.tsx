import React from 'react';

function RadioGroup({ children, onChange, active, style }: any) {
  
  const handleActiveChange = (val: any) => {
    onChange && onChange(val)
  }
  return (
    <div style={style}>
      {
        React.Children.map(children, (child: any) => {
          return React.cloneElement(child, {
            label: child.props.children,
            value: child.props.value,
            active: active,
            onClick: handleActiveChange,
            ...child.props,
          })
        })
      }
    </div>
  );
}

export default RadioGroup;
