import React, { useState } from 'react';
import Icon from '../Icon';
import cls from 'classnames'

import './index.less';

interface IProps {
  onChange?: (value: any) => any;
  showSearch?: boolean;
  value?: any;
  [props: string]: any
}

export const Input = ({ type = "text", value, onChange, ...restProps }: any) => {
  return (
    <input
      type={type}
      className="search-input"
      onChange={onChange}
      value={value}

      {...restProps}
    />
  )
}

const Search = (props: IProps) => {
  const { onChange, showSearch, value, style, focus = false, ...restProps } = props;

  const [isFocus, setIsFocus] = useState(focus)
  const handleChange = (e: any) => onChange && onChange(e.target.value)

  return (
    <span className={cls("search-container", isFocus ? 'focus' : '')} style={style}>
      {showSearch && <span className="search-prefix"><Icon name={'search'} /></span>}
      <Input type="text" onChange={handleChange} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} value={value}  {...restProps} />
    </span>
  );
}

export default Search;   