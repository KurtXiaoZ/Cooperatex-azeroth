import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import Range from "rc-slider";
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentStyle } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import './index.less';
import { useEffect, useState } from 'react';

export function TextSetterStyle(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const dispatch = useDispatch();

    const [width, setWidth] = useState(parseInt(component?.style?.width));

    useEffect(() => {
      setWidth(parseInt(component?.style?.width));
    }, [component?.style?.width]);

    if(!component) return <></>;


    return <>
    <SetterHeader title={'Style'}/>
    <div className='text-setter-style-content'>
        <div className='text-setter-style-content-title'>Size of Text Box</div>
        <div className='text-setter-style-content-editor'>
            <span className='text-setter-style-content-editor-title'>Width</span>
            <input className='text-setter-style-content-editor-input' value={width} onChange={(e: any) => setWidth(e.target.value)}/>
        </div>
    </div>
    <div className='text-style-setter-footer'><SetterFooter action={() => dispatch(setComponentStyle({pageKey: pageKey, componentKey: componentKey, style:{width: width}}))}/></div>
    </>
}

function listFonts() {
    let { fonts } = document;
    const it = fonts.entries();
  
    let arr = [];
    let done = false;
  
    while (!done) {
      const font = it.next();
      if (!font.done) {
        arr.push(font.value[0]);
      } else {
        done = font.done;
      }
    }
  
    return arr;
  }