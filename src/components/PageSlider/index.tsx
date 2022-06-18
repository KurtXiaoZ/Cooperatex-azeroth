import { mockCurPageElementsData } from 'components/LeftMenu/datas';
import React from 'react';
import { StoreProps, withStore } from 'store'
import './index.less'

function PageSlider({store: { state: { pageList }, setPageDate } }: StoreProps ) {

  const handleClick = (value: any) => {
    setPageDate({name: value.title, nodes: mockCurPageElementsData})
  }

  const renderPageViewItem = (page: any) => (
    <div className="page-slider-item" onClick={() => handleClick(page)}>
      <p>
        {page.title}
      </p>
      <div className="page-box" />
    </div>
  )

  const renderFlattenViews = (originlist: any[]) => {
    return originlist.map((item: { children: any; title: string}) => {
      if (item && item.children) {
        return <div className={"page-folder-container"}>
          <p className={"page-folder-title"}>{item.title}</p>
          <div className={"page-folder-content"}>
            {renderFlattenViews(item.children)}
          </div>
        </div>
      }
      return renderPageViewItem(item)
    }) 
  }

  return (
    <div className="page-list-slider-container">
      <div className="page-list-slider-content">
        {renderFlattenViews(pageList)}
      </div>
    </div>
  );
}

export default withStore(PageSlider);
