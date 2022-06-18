import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentStyle } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import './index.less';

export function ArrowSetterStyle(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);

    const dispatch = useDispatch();
    const [displayFillColorEditor, setDisplayFillColorEditor] = useState(false);
    const [fillColor, setFillColor] = useState(component?.style?.fillColor);
    const [width, setWidth] = useState(parseInt(component?.style?.width));
    const [height, setHeight] = useState(parseInt(component?.style?.height));
    const [opacity, setOpacity] = useState(component?.style?.opacity);

    useEffect(() => {
        setFillColor(component?.style?.fillColor);
    }, [component?.style?.fillColor]);
    useEffect(() => {
        setWidth(component?.style?.width);
    }, [component?.style?.width]);
    useEffect(() => {
        setHeight(component?.style?.height);
    }, [component?.style?.height]);
    useEffect(() => {
        setOpacity(Math.round(component?.style?.opacity * 100));
    }, [component?.style?.opacity]);

    if(!component) return <></>;
    
    return <>
    <SetterHeader title={'Style'}/>
    <div className='line-setter-content'>
        <div className='line-setter-content-color'>
            <div className='line-setter-content-color-title'>Color</div>
            <div className='line-setter-content-color-selector'>
                <div 
                    className='line-setter-content-color-displayer' 
                    style={{backgroundColor: fillColor}}
                    onClick={() => setDisplayFillColorEditor(!displayFillColorEditor)}
                ></div>
                <span className='line-setter-content-color-word'>{fillColor}</span>
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
            <section className='line-setter-content-color-editor' style={{display: displayFillColorEditor ? 'block' : 'none'}}>
                <HexColorPicker color={fillColor} onChange={(value) => setFillColor(value)}/>
            </section>
        </div>
        <div className='line-setter-content-color-title'>Size of Shape</div>
        <div className='line-setter-content-size'>
            <span className='line-setter-content-size-title'>Width</span>
            <input className='line-setter-content-size-input' value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)}/>
            <span className='line-setter-content-size-title'>Height</span>
            <input className='line-setter-content-size-input' value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)}/>
        </div>
        <SetterFooter action={() => {
            dispatch(setComponentStyle({pageKey: pageKey, componentKey: componentKey, style: {
                fillColor: fillColor,
                width: width,
                height: height,
                opacity: opacity / 100,
            }}))
        }}/>
    </div>
    </>
}