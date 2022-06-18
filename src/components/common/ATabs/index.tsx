import React, { useEffect, useState } from 'react';


import './index.less';
const Tabs = ({ style, children, tabList = [], defaultTab, onChange, activeKey }: any) => {

  const [curTab, setCurTab] = useState(defaultTab || '');

  useEffect(() => {
    activeKey && setCurTab(activeKey)
  }, [activeKey])

  useEffect(() => {
    onChange && onChange(curTab)
  }, [curTab])

  return (
    <div className="tabs-container" style={style}>
      <div className="tabs-nav-wrap">
        {tabList.map(({ tabName, tabKey }: any) =>
          <div
            key={tabKey}
            className={`tabs-tab ${tabKey === curTab ? 'active' : ''}`}
            onClick={(e: any) => {
              e.stopPropagation()
              setCurTab(tabKey)
            }}
          >
            {tabName}
          </div>)}
      </div>
      <div className="tabs-content">
        {tabList.find(({ tabKey }: any) => tabKey === curTab)?.tabContent}
      </div>

    </div>
  );
}

export default Tabs;  