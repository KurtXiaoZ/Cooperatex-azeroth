import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import Range from "rc-slider";
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentStyle } from 'redux/pagesReducer';
import store, { RootState } from 'redux/store';
import { HexColorPicker } from "react-colorful";
import './index.less';
import { useEffect, useState } from 'react';


export function LineSetter(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const dispatch = useDispatch();
    const [displayColorEditor, setDisplayColorEditor] = useState(false);
    const [backgroundColor, setbackGroundColor] = useState(component?.style?.backgroundColor);
    const [width, setWidth] = useState(parseInt(component?.style?.width));
    const [opacity, setOpacity] = useState(component?.style?.opacity);

    useEffect(() => {
        setWidth(component?.style?.width);
    }, [component?.style?.width]);

    if(!component) return <></>;

    const changeOpacity = (value: number | number[]) => {
        setOpacity(value || value[0]);
    }

    const changeColor = (value: string) => {
        setbackGroundColor(value);
    }

    return <>
    <SetterHeader title={'Style'}/>
    <div className='line-setter-content'>
        <div className='line-setter-content-color'>
            <div className='line-setter-content-color-title'>Color</div>
            <div className='line-setter-content-color-selector'>
                <div 
                    className='line-setter-content-color-displayer' 
                    style={{backgroundColor: backgroundColor || 'transparent'}} 
                    onClick={() => setDisplayColorEditor(!displayColorEditor)}
                ></div>
                <span className='line-setter-content-color-word'>{backgroundColor}</span>
                <Slider 
                    min={0}
                    max={1}
                    step={0.01}
                    value={opacity}
                    onChange={changeOpacity}
                    trackStyle={{
                        background: 'linear-gradient(90deg, rgba(215, 144, 249, 0) 0%, #D790F9 100%)',
                    }}
                    handleStyle={{
                        background: '#FFFFFF',
                        border: '3px solid #D790F9',
                        opacity: 1
                    }}
                />
                <span className='line-setter-content-color-percentage'>{`${opacity * 100}%`}</span>
            </div>
            <section className='line-setter-content-color-editor' style={{display: displayColorEditor ? 'block' : 'none'}}>
                <HexColorPicker color={backgroundColor} onChange={changeColor}/>
            </section>
        </div>
        <div className='line-setter-content-color-title'>Size of Line</div>
        <div className='line-setter-content-size'>
            <span className='line-setter-content-size-title'>Length</span>
            <input className='line-setter-content-size-input' value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)}/>
        </div>
        <SetterFooter action={() => dispatch(setComponentStyle({pageKey: pageKey, componentKey: componentKey, style:{
            width: width,
            opacity: opacity,
            backgroundColor: backgroundColor
        }}))}/>
    </div>
    </>
}