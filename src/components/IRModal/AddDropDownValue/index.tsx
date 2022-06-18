import React, { useState } from 'react'
import './index.less'
import AddButton from 'components/common/AddButton'
import EditableText from 'components/common/EditableText'



const AddDropDownValue = () => {
  const [values, setValue] = useState<any[]>([])
  const handleValueChange = (val: any) => {
    console.log('-------val:', val)
  }

  const handleAddNewValue = () => {
    values.push(0)
    setValue([...values])
  }
  return <div className='dropdown-values-wrap'>
    {values.map((value: number) => (
      <div className='dropdown-value-item'><EditableText text={value} onChange={handleValueChange} /></div>
    ))}
    <AddButton text="Add Drop Down Value" onAdd={handleAddNewValue} />
  </div>
}

export default AddDropDownValue