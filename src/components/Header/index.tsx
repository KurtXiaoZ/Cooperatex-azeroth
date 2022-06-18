import React, { useEffect, useRef, useState } from 'react';
import home from '../../assets/svgs/home.svg';
import homeClicked from '../../assets/svgs/homeClicked.svg';
import Button from '../common/Button';
import Icon from '../common/Icon';

import './index.less';
import Search from 'components/common/Search';
import ArrowIcon from 'components/common/ArrowIcon';
import Tooltip from 'components/common/Tooltip';
import { withRouter } from 'App';
import { StoreContext } from 'store';
import { getProjectData, getProjectList } from 'services/past';

interface IProps {
  curProject: any;
  setCurProject: any;
  navigate: any;
  location: any
}

function Header({
  //  viewPercent, setViewPercent, 
  navigate, location }: IProps) {

  const { state: { curProject, canvasSize }, setCurProject, setCanvasSize } = StoreContext;

  const [projectListVisible, setProjectListVisible] = useState(false);
  const [viewPercent, setViewPercent] = useState(100);
  const [projectList, setProjectList] = useState<any[]>([]);

  const iconRef = useRef<HTMLElement>(null)



  useEffect(() => {
    // getProjectData().then((resData: any) => {
    //   if (resData) {
    //     setCurProject({
    //       projectName: 'customName',
    //       projectId: resData.projectId
    //     })
    //   } else {
    //     console.log('data error')
    //   }
    // })
    getProjectList('10001').then((resData: any) => {
      if (resData && Array.isArray(resData)) {
        setProjectList(resData)
      } else {
        console.log('data error')
      }
    })
  }, [])

  // useEffect(() => {
  //   getProjectList('10001').then((resData: any) => {
  //     if (resData && Array.isArray(resData)) {
  //       setProjectList(resData)
  //     } else {
  //       console.log('data error')
  //     }
  //   })
  // }, [curProject])



  useEffect(() => {
    setCanvasSize(viewPercent)
  }, [viewPercent])

  const handleChange = (value: any) => {
    setCurProject(value)
    setProjectListVisible(false)
  }

  const handleSave = () => {
    // console.log('---save current project')
  }

  const handleViewPercent = (action: 'cut' | 'plus') => {
    if (action === 'cut') setViewPercent(viewPercent - 20);
    else setViewPercent(viewPercent + 20)
  }

  const handlePreview = () => {
    navigate && navigate('/preview')
  }

  return (
    <div className="header-container">
      <div className="gohome" >
        <Icon name={'home'} imgs={[home, homeClicked]} onClick={() => location.pathname != "/home" && navigate('/home')} />
      </div>

      <div className="product-title">
        <span>
          {curProject.projectName}
        </span>
        <Tooltip
          overlay={<div className="project-list">
            <div className="project-content">
              {projectList.map((item: any) => {
                return (
                  <div key={item.projectId} className="project-item" onClick={() => handleChange(item)}>{item.projectName}</div>
                )
              })}
            </div>
          </div>}
          visible={projectListVisible}
          isSelect={true}
          placement="br"
          onClick={() => {
            setProjectListVisible(!projectListVisible)
          }}
        >
          <span ref={iconRef} ><ArrowIcon style={{ margin: '0 8px' }} /></span>
        </Tooltip >
      </div>
      <div className="product-devOpt">
        <Button type="primiry" onClick={handleSave}>Save</Button>
        <ArrowIcon style={{ margin: '0 16px', }} point='l' onClick={() => handlePreview()} />
        <span style={{ marginRight: 8 }} onClick={() => handleViewPercent('plus')}> + </span>
        <span style={{ marginRight: 8 }} >{viewPercent}%</span>
        <span onClick={() => handleViewPercent('cut')}> - </span>
      </div>

    </div>
  );
}

export default withRouter(Header);