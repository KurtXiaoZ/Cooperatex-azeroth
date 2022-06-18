import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import Range from "rc-slider";
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setComponent, setComponentStyle } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import './index.less';
import { useEffect, useState } from 'react';
import Triangle from './triangle.svg';
import Chosen from './chosen.svg';

export function IRSetterStyle(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const dispatch = useDispatch();
    const [buttonWidth, setButtonWidth] = useState("");
    const [buttonHeight, setButtonHeight] = useState("");
    const [inputWidth, setInputWidth] = useState("");

    useEffect(() => {
        if(component?.style?.buttonWidth) setButtonWidth(component?.style?.buttonWidth);
    }, [component?.style?.buttonWidth]);
    useEffect(() => {
        if(component?.style?.buttonHeight) setButtonHeight(component?.style?.buttonHeight);
    }, [component?.style?.buttonHeight]);
    useEffect(() => {
        if(component?.style?.inputWidth) setInputWidth(component?.style?.inputWidth);
    }, [component?.style?.inputWidth]);

    if(!component) return <></>;

    const setButtonStyle = (buttonStyle: string) => {
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.style.buttonStyle = buttonStyle;
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }
    const setInputStyle = (inputStyle: string) => {
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.style.inputStyle = inputStyle;
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }
    const setSelectorStyle = (selectorStyle: string) => {
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.style.selectorStyle = selectorStyle;
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }
    const changeButtonWidth = (e: any) => {
        let input = e.target.value;
        if(e.target.value > parseInt(component.style.width) - component.buttonX) input = parseInt(component.style.width) - component.buttonX;
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.style.buttonWidth = input + 'px';
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }
    const changeButtonHeight = (e: any) => {
        let input = e.target.value;
        if(e.target.value > parseInt(component.style.height) - component.buttonY) input = parseInt(component.style.height) - component.buttonY;
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.style.buttonHeight = input + 'px';
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }
    const changeInputWidth = (e: any) => {
        let input = e.target.value;
        if(e.target.value > parseInt(component.style.width) - component.inputX) input = parseInt(component.style.width) - component.inputX;
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.style.inputWidth = input + 'px';
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }

    return <>
        <SetterHeader title={'Style'}/>
        <div className='ir-setter-style-content'>
            <div className='ir-setter-style-content-title'>Theme Buttons</div>
            <div className='ir-setter-style-content-button-container'>
                <div className='option-container' onClick={() => setButtonStyle('button1')}>
                    <span className='button-style button-1'>Button</span>
                    <img src={Chosen} className='chosen' style={{display: component.style.buttonStyle === 'button1' ? 'block' : 'none'}}/>
                </div>
                <div className='option-container' onClick={() => setButtonStyle('button2')}>
                    <span className='button-style button-2'>Button</span>
                    <img src={Chosen} className='chosen' style={{display: component.style.buttonStyle === 'button2' ? 'block' : 'none'}}/>
                </div>
            </div>
            <div className='ir-setter-style-content-button-container'>
                <div className='option-container' onClick={() => setButtonStyle('button3')}>
                    <span className='button-style button-3'>Button</span>
                    <img src={Chosen} className='chosen' style={{display: component.style.buttonStyle === 'button3' ? 'block' : 'none'}}/>
                </div>
                <div className='option-container' onClick={() => setButtonStyle('button4')}>
                    <span className='button-style button-4'>Button</span>
                    <img src={Chosen} className='chosen' style={{display: component.style.buttonStyle === 'button4' ? 'block' : 'none'}}/>
                </div>
            </div>
            <div className='ir-setter-style-content-button-container'>
                <div className='option-container' onClick={() => setButtonStyle('button5')}>
                    <span className='button-style button-5'>Button</span>
                    <img src={Chosen} className='chosen' style={{display: component.style.buttonStyle === 'button5' ? 'block' : 'none'}}/>
                </div>
                <div className='option-container' onClick={() => setButtonStyle('button6')}>
                    <span className='button-style button-6'>Button</span>
                    <img src={Chosen} className='chosen' style={{display: component.style.buttonStyle === 'button6' ? 'block' : 'none'}}/>
                </div>
            </div>
            {component?.type !== 'unmergedClick' && 
            <>
                <div className='ir-setter-style-content-title'>Theme Input Box</div>
                <>
                {component?.type !== 'unmergedNonclick' && 
                    <div className='ir-setter-style-content-selector-container'>
                        <div className='option-container' onClick={() => setSelectorStyle('selector1')}>
                            <div className='selector-1'>
                                <div className='selector-1-header'>
                                    <div className='selector-1-triangle'><img src={Triangle}/></div>
                                </div>
                                <div className='selector-1-content'></div>
                            </div>
                            <img src={Chosen} className='chosen' style={{display: component.style.selectorStyle === 'selector1' ? 'block' : 'none'}}/>
                        </div>
                        <div className='option-container' onClick={() => setSelectorStyle('selector2')}>
                            <div className='selector-2'>
                                <div className='selector-2-header'>
                                    <div className='selector-2-triangle'><img src={Triangle}/></div>
                                </div>
                                <div className='selector-2-content'></div>
                            </div>
                            <img src={Chosen} className='chosen' style={{display: component.style.selectorStyle === 'selector2' ? 'block' : 'none'}}/>
                        </div>
                    </div>
                }
                <div className='ir-setter-style-content-selector-container'>
                    <div className='option-container' onClick={() => setInputStyle('input1')}>
                        <div className='input-1'></div>
                        <img src={Chosen} className='chosen' style={{display: component.style.inputStyle === 'input1' ? 'block' : 'none'}}/>
                    </div>
                    <div className='option-container' onClick={() => setInputStyle('input2')}>
                        <div className='input-2'></div>
                        <img src={Chosen} className='chosen' style={{display: component.style.inputStyle === 'input2' ? 'block' : 'none'}}/>
                    </div>
                </div>
                <div className='ir-setter-style-content-selector-container'>
                    <div className='option-container' onClick={() => setInputStyle('input3')}>
                        <div className='input-3'></div>
                        <img src={Chosen} className='chosen' style={{display: component.style.inputStyle === 'input3' ? 'block' : 'none'}}/>
                    </div>
                </div>
                </>
            </>
            }
            <div className='ir-setter-style-content-title'>Size of Button</div>
            <div className='ir-setter-style-content-button-size'>
                <span className='ir-setter-style-content-button-size-title'>Width</span>
                <input type="number" className='ir-setter-style-content-button-size-input' value={parseInt(buttonWidth)} onChange={changeButtonWidth}/>
                <span className='ir-setter-style-content-button-size-title'>Height</span>
                <input type="number" className='ir-setter-style-content-button-size-input' value={parseInt(buttonHeight)} onChange={changeButtonHeight}/>
            </div>
            {component?.type !== 'unmergedClick' && <>
            <div className='ir-setter-style-content-title'>Size of Input</div>
            <div className='ir-setter-style-content-button-size'>
                <span className='ir-setter-style-content-button-size-title'>Width</span>
                <input type="number" className='ir-setter-style-content-button-size-input' value={parseInt(inputWidth)} onChange={changeInputWidth}/>
            </div></>
            }
        </div>
        <div className='text-style-setter-footer'><SetterFooter action={undefined}/></div>
    </>
}