import React, { useState } from 'react';
import './index.less'

function AddButton({ onAdd, text, hasBackground }: any) {
  const [isClick, setIsClick] = useState(false)
  const handleAddOption = () => {
    setIsClick(false);
    onAdd && onAdd()
  }
  return (
    <div
      onClick={handleAddOption}
      className={`add-more-button ${isClick ? 'clicked' : ''} ${hasBackground ? 'background' : ''}`}
      onMouseDown={() => setIsClick(true)}
      onMouseUp={handleAddOption}
    >
      + {text || "Add More Option"}
    </div >
  );
}

export default AddButton;

