import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import Range from "rc-slider";
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentStyle } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import './index.less';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export function SwitcherSetterStyle(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const dispatch = useDispatch();


    const [defaultColor, setDefaultColor] = useState(component?.style.defaultColor);
    const [chosenColor, setChosenColor] = useState(component?.style.chosenColor);
    const [displayDefaultColorEditor, setDisplayDefaultColorEditor] = useState(false);
    const [displayChosenColorEditor, setDisplayChosenColorEditor] = useState(false);

    useEffect(() => {
        setDefaultColor(component?.style?.defaultColor);
    }, [component?.style?.defaultColor]);
    useEffect(() => {
        setChosenColor(component?.style?.chosenColor);
    }, [component?.style?.chosenColor]);


    return <>
    <SetterHeader title={'Style'}/>
    <div className='line-setter-content'>
        <div className='line-setter-content-color-title'>Default & Chosen Color</div>
        <div className='switcher-setter-color'>
            <div className='switcher-setter-color-default'>
                <div 
                    className='switcher-setter-color-default-displayer' 
                    style={{backgroundColor: defaultColor}}
                    onClick={() => {
                        setDisplayDefaultColorEditor(!displayDefaultColorEditor);
                        setDisplayChosenColorEditor(false);
                    }}
                ></div>
                <span className='switcher-setter-color-default-word'>{defaultColor}</span>
            </div>
            <div className='switcher-setter-color-chosen'>
                <div 
                    className='switcher-setter-color-chosen-displayer' 
                    style={{backgroundColor: chosenColor}}
                    onClick={() => {
                        setDisplayChosenColorEditor(!displayChosenColorEditor);
                        setDisplayDefaultColorEditor(false);
                    }}
                ></div>
                <span className='switcher-setter-color-chosen-word'>{chosenColor}</span>
            </div>
        </div>
        <section className='line-setter-content-color-editor' style={{display: displayDefaultColorEditor ? 'block' : 'none'}}>
            <HexColorPicker color={defaultColor} onChange={(value) => setDefaultColor(value)}/>
        </section>
        <section className='line-setter-content-color-editor' style={{display: displayChosenColorEditor ? 'block' : 'none'}}>
            <HexColorPicker color={chosenColor} onChange={(value) => setChosenColor(value)}/>
        </section>
        <SetterFooter action={() => {
            dispatch(setComponentStyle({pageKey: pageKey, componentKey: componentKey, style: {
                defaultColor: defaultColor,
                chosenColor: chosenColor,
            }}))
        }}/>
    </div>
    </>
}