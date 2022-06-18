import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentStyle } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import { HexColorPicker } from "react-colorful";
import './index.less';
import { useEffect, useRef, useState } from 'react';
import ArrowIcon from '../../icons/arrow.svg';
import AnimateHeight from 'react-animate-height';
import { FONT_FAMILIES } from './constants/fontFamilies';



export function TextSetterEdit(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const dispatch = useDispatch();

    const [displayColorEditor, setDisplayColorEditor] = useState(false);
    const [expandFamily, setExpandFamily] = useState(false);
    const [expandWeight, setExpandWeight] = useState(false);
    const [expandSize, setExpandSize] = useState(false);
    const [animationDoneFamily, setAnimationDoneFamily] = useState(false);
    const [animationDoneSize, setAnimationDoneSize] = useState(false);
    const [textAlign, setTextAlign] = useState('left');
    const [fontStyle, setFontStyle] = useState('');
    const [fontWeight, setFontWeight] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [fontFamily, setFontFamily] = useState('');
    const [opacity, setOpacity] = useState(0);
    const [color, setColor] = useState(component?.style?.color);
    

    useEffect(() => {
        setFontWeight(component?.style?.fontWeight);
    }, [component?.style?.fontWeight]);
    useEffect(() => {
        setFontSize(component?.style?.fontSize);
    }, [component?.style?.fontSize]);
    useEffect(() => {
        setFontFamily(component?.style?.fontFamily);
    }, [component?.style?.fontFamily]);
    useEffect(() => {
        setOpacity(Math.round(component?.style?.opacity * 100));
    }, [component?.style?.opacity]);
    useEffect(() => {
        setColor(component?.style?.color);
    }, [component?.style?.color]);
    useEffect(() => {
        if(component?.style?.fontStyle) setFontStyle(component?.style?.fontStyle);
    }, [component?.style?.fontStyle]);
    useEffect(() => {
        if(component?.style?.textDecoration) setFontStyle(component?.style?.textDecoration);
    }, [component?.style?.textDecoration]);
    useEffect(() => {
        if(component?.style?.textAlign) setTextAlign(component?.style?.textAlign);
    }, [component?.style?.textAlign])

    useEffect(() => {
        const hideFamily = () => {
            setAnimationDoneFamily(false);
            setExpandFamily(false);
        }
        if(expandFamily) {
            document.addEventListener('click', hideFamily, false);
        }
        else document.removeEventListener('click', hideFamily, false);
    }, [expandFamily]);

    useEffect(() => {
        const hideWeight = () => {
            setExpandWeight(false);
        }
        if(expandWeight) {
            document.addEventListener('click', hideWeight, false);
        }
        else document.removeEventListener('click', hideWeight, false);
    }, [expandWeight]);

    useEffect(() => {
        const hideSize = () => {
            setAnimationDoneSize(false);
            setExpandSize(false);
        }
        if(expandSize) {
            document.addEventListener('click', hideSize, false);
        }
        else document.removeEventListener('click', hideSize, false);
    }, [expandSize]);

    if(!component) return <></>;

    const action = () => {
        dispatch(setComponentStyle({
            pageKey: pageKey,
            componentKey: componentKey,
            style: {
                fontFamily: fontFamily,
                fontWeight: fontWeight,
                fontSize: fontSize + 'px',
                color: color,
                opacity: opacity / 100,
                textAlign: textAlign,
                fontStyle: fontStyle === 'italic' ? fontStyle : undefined,
                textDecoration: fontStyle === 'underline' || fontStyle === 'line-through' ? fontStyle : undefined,
            }
        }))
    }

    const showFamily = (e: any) => {
        e.stopPropagation();
        setAnimationDoneSize(false);
        setExpandSize(false);
        setExpandWeight(false);
        setExpandFamily(true);
    }

    const showWeight = (e: any) => {
        e.stopPropagation();
        setAnimationDoneFamily(false);
        setAnimationDoneSize(false);
        setExpandFamily(false);
        setExpandSize(false);
        setExpandWeight(true);
    }

    const showSize = (e: any) => {
        e.stopPropagation();
        setExpandWeight(false);
        setExpandSize(true);
    }

    const renderFamilyOptions = () => {
        return FONT_FAMILIES.map((value: string) => {
            return <div style={{backgroundColor: fontFamily.toLowerCase() === value.toLowerCase() ? '#C4C4C4' : 'transparent'}} className='text-setter-content-expand-option' onClick={(e: any) => {e.stopPropagation(); setFontFamily(value);}}>{value}</div>
        });
    }

    const renderSizeOptions = () => {
        let options = [];
        for(let i = 14; i <= 100; i += 2) {
            options.push(<div style={{backgroundColor: fontSize === i.toString() ? '#C4C4C4' : 'transparent'}} className='text-setter-content-expand-option' onClick={(e: any) => {
                e.stopPropagation();
                setFontSize(i.toString());
            }}>{i}</div>)
        }
        return options;
    }

    return <>
    <SetterHeader title={'Text Settings'}/>
    <div className='text-setter-content'>
        <div className='text-setter-content-color'>
            <div className='text-setter-content-color-title'>Color</div>
            <div className='text-setter-content-color-selector'>
                <div 
                    className='text-setter-content-color-displayer' 
                    style={{backgroundColor: color}} 
                    onClick={() => setDisplayColorEditor(!displayColorEditor)}
                ></div>
                <span className='text-setter-content-color-word'>{color}</span>
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
                <span className='text-setter-content-color-percentage'>{`${opacity}%`}</span>
            </div>
            <section className='text-setter-content-color-editor' style={{display: displayColorEditor ? 'block' : 'none'}}>
                <HexColorPicker color={color} onChange={(value) => setColor(value)}/>
            </section>
        </div>
        <div className='text-setter-content-color-title'>Font</div>
        <div className='text-setter-content-font-content'>
            <span className='text-setter-content-font-content-value'>{fontFamily}</span>
            <img className='text-setter-content-font-content-arrow' src={ArrowIcon}/>
            <div className='text-setter-content-font-content' onClick={showFamily}>
                <span className='text-setter-content-font-content-value'>{fontFamily}</span>
                <img className='text-setter-content-font-content-arrow' src={ArrowIcon}/>
                {
                    animationDoneFamily ? 
                    <div className='text-setter-content-expand' style={{height: '240px', display: expandFamily ? 'block' : 'none'}}>
                        {renderFamilyOptions()}
                    </div>
                    :
                    <AnimateHeight
                        className='text-setter-content-expand'
                        duration={ 500 }
                        height={expandFamily ? 240 : 0}
                        onAnimationEnd={() => setAnimationDoneFamily(expandFamily)}
                    >
                        {renderFamilyOptions()}
                    </AnimateHeight>
                }
            </div>
        </div>
        <div className='text-setter-content-color-title'>Weight & Size</div>
        <div className='text-setter-content-weight-size'>
            <div className='text-setter-content-font-content weight-size-1' onClick={showWeight}>
                <span className='text-setter-content-font-content-value'>{fontWeight}</span>
                <img className='text-setter-content-font-content-arrow' src={ArrowIcon}/>
                <AnimateHeight
                    className='text-setter-content-expand'
                    duration={ 500 }
                    height={expandWeight ? 'auto' : 0}
                >
                    <div style={{backgroundColor: fontWeight === 'Normal' ? '#C4C4C4' : 'transparent'}} className='text-setter-content-expand-option' onClick={() => setFontWeight('Normal')}>Normal</div>
                    <div style={{backgroundColor: fontWeight === 'Lighter' ? '#C4C4C4' : 'transparent'}} className='text-setter-content-expand-option' onClick={() => setFontWeight('Lighter')}>Lighter</div>
                    <div style={{backgroundColor: fontWeight === 'Bold' ? '#C4C4C4' : 'transparent'}} className='text-setter-content-expand-option' onClick={() => setFontWeight('Bold')}>Bold</div>
                </AnimateHeight>
            </div>
            <div className='text-setter-content-font-content' onClick={showSize}>
                <span className='text-setter-content-font-content-value'>{parseInt(fontSize)}</span>
                <img className='text-setter-content-font-content-arrow' src={ArrowIcon}/>
                {
                    animationDoneSize ? 
                    <div className='text-setter-content-expand' style={{height: '200px', display: expandSize ? 'block' : 'none'}}>
                        {renderSizeOptions()}
                    </div>
                    :
                    <AnimateHeight
                        className='text-setter-content-expand'
                        duration={ 500 }
                        height={expandSize ? 200 : 0}
                        onAnimationEnd={() => setAnimationDoneSize(expandSize)}
                    >
                        {renderSizeOptions()}
                    </AnimateHeight>
                }
            </div>
        </div>
        <div className='text-setter-content-color-title'>Align & Style</div>
        <div className='text-setter-content-align-style'>
            <div className='text-setter-content-align'>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setTextAlign("left")}>
                    {textAlign === "left" && <rect width="40" height="40" rx="5" fill="black" fill-opacity="0.05"/>}
                    <rect x="8" y="11" width="22" height="4" rx="1" fill={textAlign === 'left' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'left' && "0.2"}/>
                    <rect x="8" y="18" width="12" height="4" rx="1" fill={textAlign === 'left' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'left' && "0.2"}/>
                    <rect x="8" y="25" width="18" height="4" rx="1" fill={textAlign === 'left' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'left' && "0.2"}/>
                </svg>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setTextAlign("center")}>
                    {textAlign === "center" && <rect width="40" height="40" rx="5" fill="black" fill-opacity="0.05"/>}
                    <rect x="9" y="11" width="22" height="4" rx="1" fill={textAlign === 'center' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'center' && "0.2"}/>
                    <rect x="14" y="18" width="12" height="4" rx="1" fill={textAlign === 'center' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'center' && "0.2"}/>
                    <rect x="11" y="25" width="18" height="4" rx="1" fill={textAlign === 'center' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'center' && "0.2"}/>
                </svg>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setTextAlign("right")}>
                    {textAlign === "right" && <rect width="40" height="40" rx="5" fill="black" fill-opacity="0.05"/>}
                    <rect x="9" y="11" width="22" height="4" rx="1" fill={textAlign === 'right' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'right' && "0.2"}/>
                    <rect x="19" y="18" width="12" height="4" rx="1" fill={textAlign === 'right' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'right' && "0.2"}/>
                    <rect x="13" y="25" width="18" height="4" rx="1" fill={textAlign === 'right' ? "#C698DC" : "#4D4D4D"} fill-opacity={textAlign !== 'right' && "0.2"}/>
                </svg>
            </div>
            <div className='text-setter-content-style'>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setFontStyle(fontStyle === "italic" ? "" : "italic")}>
                    {fontStyle === "italic" && <rect width="40" height="40" rx="5" fill="black" fill-opacity="0.05"/>}
                    <path d="M11.5 10H29.5L28.5 12.5H10.5L11.5 10Z" fill={fontStyle === "italic" ? "#C698DC" : "#DBDBDB"}/>
                    <path d="M13 30L19 10H22L16 30H13Z" fill={fontStyle === "italic" ? "#C698DC" : "#DBDBDB"}/>
                </svg>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setFontStyle(fontStyle === "underline" ? "" : "underline")}>
                    {fontStyle === "underline" && <rect width="40" height="40" rx="5" fill="black" fill-opacity="0.05"/>}
                    <rect x="11" y="10" width="18" height="2.5" fill={fontStyle === "underline" ? "#C698DC" : "#DBDBDB"}/>
                    <rect x="10.5" y="30" width="19" height="0.8" fill={fontStyle === "underline" ? "#C698DC" : "#DBDBDB"}/>
                    <rect x="18.5" y="29" width="19" height="3" transform="rotate(-90 18.5 29)" fill={fontStyle === "underline" ? "#C698DC" : "#DBDBDB"}/>
                </svg>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setFontStyle(fontStyle === "line-through" ? "" : "line-through")}>
                    {fontStyle === "line-through" && <rect width="40" height="40" rx="5" fill="black" fill-opacity="0.05"/>}
                    <rect x="11" y="10" width="18" height="2.5" fill={fontStyle === "line-through" ? "#C698DC" : "#DBDBDB"}/>
                    <rect x="10.5" y="19" width="19" height="0.8" fill={fontStyle === "line-through" ? "#C698DC" : "#DBDBDB"}/>
                    <rect x="18.5" y="30" width="20" height="3" transform="rotate(-90 18.5 30)" fill={fontStyle === "line-through" ? "#C698DC" : "#DBDBDB"}/>
                </svg>
            </div>
        </div>        
        <SetterFooter action={action}/>
    </div>
    </>
}