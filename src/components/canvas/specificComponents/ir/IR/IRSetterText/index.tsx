import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setComponent, setComponentStyle } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import { HexColorPicker } from "react-colorful";
import './index.less';
import { useEffect, useRef, useState } from 'react';
import ArrowIcon from '../../icons/arrow.svg';
import AnimateHeight from 'react-animate-height';

export function IRSetterText(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        if(component.buttonText) setButtonText(component.buttonText);
    }, [component.buttonText]);

    const changeButtonText = (e: any) => {
        let input = e.target.value;
        if(input === "") input = buttonText.substring(0, 1);
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.buttonText = input;
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }

    const changeTextSize = (value: any) => {
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.style.buttonFontSize = (value / parseInt(component.style.height)).toFixed(2);
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }

    return <>
    <SetterHeader title={'Text'}/>
    <div className='ir-setter-text-content'>
        <div className='ir-setter-text-content-title'>The text of the button</div>
        <input className='ir-setter-text-content-input' value={buttonText} onChange={changeButtonText}/>
        <div className='ir-setter-text-content-title'>Font size</div>
        <div className='ir-setter-text-content-size'>
            <Slider 
                min={Math.floor(parseInt(component.style.height) * 0.4)}
                max={Math.floor(parseInt(component.style.height) * 0.6)}
                step={2}
                value={Math.floor(parseInt(component.style.height) * component.style.buttonFontSize)}
                onChange={changeTextSize}
                trackStyle={{
                    background: 'linear-gradient(90deg, rgba(215, 144, 249, 0) 0%, #D790F9 100%)',
                }}
                handleStyle={{
                    background: '#FFFFFF',
                    border: '3px solid #D790F9',
                    opacity: 1
                }}
            />
            <span className='ir-setter-text-content-size-title'>{Math.floor(parseInt(component.style.height) * component.style.buttonFontSize) + 'px'}</span>
        </div>
    </div>
    <div style={{paddingRight: '20px'}}><SetterFooter action={undefined}/></div>
    </>
}