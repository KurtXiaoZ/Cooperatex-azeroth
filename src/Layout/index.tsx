import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import { withRouter } from 'App';
import './index.less'
import Fade from 'components/common/Fade';


const Layout = ({ children, location, navigate, params, ...restProps }: any) => {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    setOpen(true);
    return () => setOpen(false)
  }, [])
  return (
    <Fade in={open} type="fadeIn">
      <div className="azeroth-container">
        <header>
          <Header />
        </header>
        {React.cloneElement(children, {
          ...restProps
        })}
      </div >
    </Fade>
  )
}

export default withRouter(Layout)