import './index.less';
import { CanvasComponent } from '../CanvasComponent';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { setSelectedKey, setSetterType } from 'redux/canvasReducer';
import { setScrollHeight } from 'redux/pagesReducer';

export function Canvas(props: any) {
  const canvasRef: any = useRef(null);
  const alignInit = useRef({x: 0, y: 0});
  const posInit = useRef({left: 0, right: 0, top: 0, bottom: 0});

  const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[state.rightMenu.selectedFrontEnd]);
  const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
  const components = useSelector((state: RootState) => state?.pages[pageKey]?.components);
  const canvas = useSelector((state: RootState) => state?.pages[pageKey]?.canvas);
  const scrollHeight = useSelector((state: RootState) => state?.pages[pageKey]?.scrollHeight);
  const dispatch = useDispatch();

  useEffect(() => {
    if(canvasRef?.current?.scrollHeight) dispatch(setScrollHeight({pageKey: pageKey, scrollHeight: canvasRef?.current?.scrollHeight}));
  }, [canvasRef?.current?.scrollHeight]);

  const arr: any = [];
  canvas.forEach((componentKey: string) => {
    arr.push(<CanvasComponent 
      key={componentKey}
      canvasRef={canvasRef}
      alignInit={alignInit}
      posInit={posInit}
      componentKey={componentKey}
      pageKey={pageKey}
    />)
  });
  
  const unselect = () => {
    dispatch(setSelectedKey(""));
    dispatch(setSetterType(""));
  }
  
  return (
      <div className='canvas' id='canvas' ref={canvasRef} onMouseDown={unselect}>
        {arr}
        <div 
          id="horizontalLine"
        ></div>
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          visibility: 'hidden',
          width: '100%',
          height: scrollHeight + 'px',
        }} id="scrollHeightSetter"></div>
    </div>
  )
}