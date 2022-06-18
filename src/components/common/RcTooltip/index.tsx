import React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const RcTooltip = ({ overlay, children, placement = 'left', ...restProps }: any) => {
  return (
    <Tooltip
      placement={placement}
      overlay={overlay}
      arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
      {...restProps}
    >
      {children}
    </Tooltip>
  )
}

export default RcTooltip