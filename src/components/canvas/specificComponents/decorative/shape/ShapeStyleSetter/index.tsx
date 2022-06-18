import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentStyle } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import './index.less';
import Add from './add.svg';
import Delete from './delete.svg';

export function ShapeStyleSetter(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);

    const dispatch = useDispatch();
    const [displayFillColorEditor, setDisplayFillColorEditor] = useState(false);
    const [displayStrokeColorEditor, setDisplayStrokeColorEditor] = useState(false);
    const [fillColor, setFillColor] = useState(component?.style?.fillColor);
    const [strokeColor, setStrokeColor] = useState(component?.style?.strokeColor);
    const [strokeWidth, setStrokeWidth] = useState(component?.style?.strokeWidth);
    const [width, setWidth] = useState(parseInt(component?.style?.width));
    const [height, setHeight] = useState(parseInt(component?.style?.height));
    const [fillOpacity, setFillOpacity] = useState(component?.style?.fillOpacity)
    const [strokeOpacity, setStrokeOpacity] = useState(component?.style?.strokeOpacity);

    useEffect(() => {
        setFillColor(component?.style?.fillColor);
    }, [component?.style?.fillColor]);
    useEffect(() => {
        setStrokeColor(component?.style?.strokeColor);
    }, [component?.style?.strokeColor]);
    useEffect(() => {
        setStrokeWidth(component?.style?.strokeWidth);
    }, [component?.style?.strokeWidth]);
    useEffect(() => {
        setFillOpacity(Math.round(component?.style?.fillOpacity * 100));
    }, [component?.style?.fillOpacity]);
    useEffect(() => {
        setStrokeOpacity(Math.round(component?.style?.strokeOpacity * 100));
    }, [component?.style?.strokeOpacity]);
    useEffect(() => {
        setWidth(component?.style?.width);
    }, [component?.style?.width]);
    useEffect(() => {
        setHeight(component?.style?.height);
    }, [component?.style?.height]);

    if(!component) return <></>;

    const showStrokeEditor = () => {
        if(strokeColor !== undefined) {
            setStrokeColor(undefined);
            setStrokeOpacity(undefined);
            setStrokeWidth(undefined);
        }
        else {
            setStrokeColor('#D2D2D2');
            setStrokeWidth(1);
            setStrokeOpacity(100);
        }
    }


    
    return <>
    <SetterHeader title={'Style'}/>
    <div className='line-setter-content'>
        <div className='line-setter-content-color'>
            <div className='line-setter-content-color-title'>Fill</div>
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
                    value={fillOpacity}
                    onChange={(value) => setFillOpacity(Math.round(value || value[0]) || 0)}
                    trackStyle={{
                        background: 'linear-gradient(90deg, rgba(215, 144, 249, 0) 0%, #D790F9 100%)',
                    }}
                    handleStyle={{
                        background: '#FFFFFF',
                        border: '3px solid #D790F9',
                        opacity: 1
                    }}
                />
                <span className='line-setter-content-color-percentage'>{`${fillOpacity}%`}</span>
            </div>
            <section className='line-setter-content-color-editor' style={{display: displayFillColorEditor ? 'block' : 'none'}}>
                <HexColorPicker color={fillColor} onChange={(value) => setFillColor(value)}/>
            </section>
        </div>
        <div className='line-setter-content-color-title'>
            Stroke
            <img style={{display: 'inline', float: 'right'}} src={strokeColor !== undefined ? Delete : Add} onClick={showStrokeEditor}/>
        </div>
        <div className='line-setter-content-color' style={{display: strokeColor !== undefined ? 'block' : 'none'}}>
            <div className='line-setter-content-color-selector'>
                <div 
                    className='line-setter-content-color-displayer' 
                    style={{backgroundColor: strokeColor}}
                    onClick={() => setDisplayStrokeColorEditor(!displayStrokeColorEditor)}
                ></div>
                <span className='line-setter-content-color-word'>{strokeColor}</span>
                <Slider 
                    min={0}
                    max={100}
                    step={1}
                    value={strokeOpacity}
                    onChange={(value) => setStrokeOpacity(Math.round(value || value[0]) || 0)}
                    trackStyle={{
                        background: 'linear-gradient(90deg, rgba(215, 144, 249, 0) 0%, #D790F9 100%)',
                    }}
                    handleStyle={{
                        background: '#FFFFFF',
                        border: '3px solid #D790F9',
                        opacity: 1
                    }}
                />
                <span className='line-setter-content-color-percentage'>{`${strokeOpacity}%`}</span>
            </div>
            <section className='line-setter-content-color-editor' style={{display: displayStrokeColorEditor ? 'block' : 'none'}}>
                <HexColorPicker color={strokeColor} onChange={(value) => setStrokeColor(value)}/>
            </section>
            <div className='line-setter-content-size'>
                <span className='line-setter-content-size-title'>Width</span>
                <input className='line-setter-content-size-input' value={strokeWidth} onChange={(e) => setStrokeWidth(parseInt(e.target.value) || 0)}/>
            </div>
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
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                width: width,
                height: height,
                fillOpacity: fillOpacity / 100,
                strokeOpacity: strokeOpacity / 100
            }}))
        }}/>
    </div>
    </>
}