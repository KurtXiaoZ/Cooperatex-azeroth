import React from 'react';
import './index.less';

interface IProps {
  styleContent?: any;
  styleTitle?: string
}

function Card({styleContent, styleTitle}:IProps) {
  return (
    <div className="card-container">
      <p className="card-title">{styleTitle || ''}</p>
      <div className="card-content">
        {styleContent || ''}
      </div>
    </div>
  );
}

export default Card;   