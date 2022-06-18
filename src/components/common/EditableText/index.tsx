import React, { useEffect, useMemo, useState } from 'react';
import Search from '../Search';
import './index.less'


interface EditableTextProps {
  text: string | any,
  onChange: (v: any) => any,
  theme?: 'light' | 'dark',
  textType?: 'button' | 'text'
}
const EditableText = (props: EditableTextProps) => {

  const { text, onChange, theme = 'dark', textType = 'text' } = props

  const [value, setValue] = useState(text)
  const [isEdit, setIsEdit] = useState<boolean>(text ? false : true)

  const renderText = useMemo(() => {
    let textStyle = '';
    switch (textType) {
      case 'button':
        textStyle = 'button'
        break;
      default:
        break;
    }
    return <span className={`text ${textStyle}`}>{text}</span>
  }, [textType])


  useEffect(() => {
    document.addEventListener('click', handleTextClick)
    return () => document.removeEventListener('click', handleTextClick)
  }, [])

  const handleTextClick = () => {
    if (isEdit) {
      setIsEdit(false)
      onChange && onChange(value)
    }
  }

  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
    setIsEdit(true)
  }

  const handleTextChange = (val: any) => {
    setValue(val)
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setIsEdit(false)
      onChange && onChange(value)
    }
  }

  return <span className={theme === 'light' ? 'editableText-light' : ''} style={{ cursor: 'pointer' }} onDoubleClick={handleDoubleClick}>
    {isEdit ? <Search style={theme === 'light' ? {
      background: '#ffffff',
      color: '#000000'
    } : null} value={value} focus={true} onChange={handleTextChange}
      onKeyDown={(e: any) => handleKeyDown(e)} /> : renderText}
  </span>
}


export default EditableText