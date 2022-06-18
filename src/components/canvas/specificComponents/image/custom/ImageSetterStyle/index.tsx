import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentStyle } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import './index.less';


export function ImageSetterStyle(prosp: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);

    const dispatch = useDispatch();
    
    const [opacity, setOpacity] = useState(component?.style?.opacity);

    useEffect(() => {
        setOpacity(Math.round(component?.style?.opacity * 100));
    }, [component?.style?.opacity]);

    if(!component) return <></>;


    return <>
        <SetterHeader title={'style'}/>
        <div className='line-setter-content'>
            <div className='line-setter-content-color-title'>Opacity</div>
            <div className='line-setter-content-color-selector'>
                <Slider 
                        min={0}
                        max={100}
                        step={1}
                        value={opacity}
                        onChange={(value) => setOpacity(Math.round(value || value[0]) || 0)}
                        trackStyle={{
                            background: 'linear-gradient(90deg, rgba(215, 144, 249, 0) 0%, #D790F9 100%)',
                        }}
                        handleStyle={{
                            background: '#FFFFFF',
                            border: '3px solid #D790F9',
                            opacity: 1
                        }}
                />
                <span className='line-setter-content-color-percentage'>{`${opacity}%`}</span>
            </div>
            <SetterFooter action={() => {
                dispatch(setComponentStyle({pageKey: pageKey, componentKey: componentKey, style: {
                    opacity: opacity / 100
                }}))
            }}/>
        </div>
    </>
}