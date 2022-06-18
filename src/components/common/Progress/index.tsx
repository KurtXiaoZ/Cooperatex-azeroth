import React from 'react';
import './index.less'

function Progress({percent}: any) {
  return (
    <div className="a-progress">
      <div className="a-progress-inner">
        <div className="a-progress-bg" style={{
          width: `${percent}`
        }} />
      </div>
    </div>
  );
}

export default Progress;
