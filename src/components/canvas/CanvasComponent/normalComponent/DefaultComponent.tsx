import { ReactElement } from '../../ReactElement';
import { useEffect, useRef, useState } from 'react';
import { LineVer } from '../LineVer';
import { LineHor } from '../LineHor';
import { ALIGN_THRESHOLD } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { setSelectedPosition, setSelectedKey, setAlign, setSetterType } from 'redux/canvasReducer';
import { addTabComponent, removeTabComponent, setComponent, setComponentHeight, setComponentPosition, setComponentStyle, setComponentWidth } from 'redux/pagesReducer';
import store from 'redux/store';
import { renderSetterIcons } from '../../specificComponents';
import Draggable, { DraggableData } from 'react-draggable';


/**
 * ReactElement组件的wrapper, 为ReactElement提供画布相关的通用功能.
 *      功能1: 拖拽
 *      功能2: 拖拽四个角来伸缩组件大小
 *      功能3: 在功能1、2执行时，渲染出水平、垂直辅助线，并在组件某条边贴近辅助线时自动与其对齐
 * 
 * @props source   传递给ReactElement，用于渲染React元素 
 * @props canvasRef     指向Canvas div这个HTMLElement的ref对象
 * @props alignInit     记录对齐发生时鼠标的clientX、clientY，便于后续退出对齐状态；ref对象
 * @returns     带有画布相关通用功能的ReactElement
 */
export function DefaultComponent(props: any) {
    const switcherKeys: any = useSelector((state: RootState) => state.pages[props.pageKey].switcherKeys);
    const components: any = useSelector((state: RootState) => state.pages[props.pageKey].components);
    const component: any = useSelector((state: RootState) => state.pages[props.pageKey].components[props.componentKey]);
    const selectedComponentKey: string = useSelector((state: RootState) => state.canvas.selectedKey);
    const align = useSelector((state: RootState) => state.canvas.align);
    const dispatch = useDispatch();

    const reactElementRef: any = useRef();
    const [adjusting, setAdjusting] = useState(false);
    const [axis, setAxis] = useState<any>("both");
    const canvas: any = document.getElementById('canvas');

    const selectComponent = (e: any) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        dispatch(setSetterType(''));
        dispatch(setSelectedKey(props.componentKey));
    }
    useEffect(() => {
        checkSwitcher();
    }, []);
    useEffect(() => {
        if(reactElementRef.current?.offsetHeight !== undefined && reactElementRef.current?.offsetHeight > component.style.height) dispatch(setComponentHeight({pageKey: props.pageKey, componentKey: props.componentKey, height: reactElementRef.current.offsetHeight}));
    }, [reactElementRef.current?.offsetHeight, reactElementRef.current?.offsetWidth]);
    const clear = () => {
        dispatch(setAlign({left: 0, right: 0, top: 0, bottom: 0, midHor: 0, midVer: 0}));
        props.alignInit.current = {x: 0, y: 0};
        props.posInit.current = {left: 0, right: 0, top: 0, bottom: 0};
        dispatch(setSelectedPosition({left: 0, top: 0, right: 0, bottom: 0, midHor: 0, midVer: 0}));
        setAxis('both');
    }
    const checkSwitcher = () => {
        let insertedToSwitcher = false;
        let foundInSwitcher = "";
        switcherKeys.forEach((switcherKey: string) => {
            const switcher = components[switcherKey];
            const selectedTab = switcher.selectedTab;
            if(foundInSwitcher === "") {
                switcher.tabs[selectedTab].forEach((key: string) => {
                if(key === props.componentKey) {
                    foundInSwitcher = switcherKey;
                    return;
                }
                });
            } 
            else return;   
        });
        if(foundInSwitcher !== "") {
            dispatch(removeTabComponent({pageKey: props.pageKey, switcherKey: foundInSwitcher, componentKey: props.componentKey}));
        }
        switcherKeys.forEach((switcherKey: string) => {
            const switcher = components[switcherKey];
            if(inSwitcher(component.x, component.y, parseInt(component.style.width), parseInt(component.style.height), 
                switcher.x, switcher.y, parseInt(switcher.style.width), parseInt(switcher.style.height))) {
                    dispatch(addTabComponent({pageKey: props.pageKey, switcherKey: switcherKey, componentKey: props.componentKey}))
                    insertedToSwitcher = true;
                    return;
            }
        });
    }
    const dragAlign = (type: string, alignValue: number, data: any, e: any) => {
        let verAlign = false;
        if(type === 'left' || type === 'right' || type === 'midVer') verAlign = true;
        if(verAlign) setAxis('y');
        else setAxis('x');
        dispatch(setComponentPosition({pageKey: props.pageKey, componentKey: props.componentKey, x: verAlign ? alignValue : data.x, y: verAlign? data.y : alignValue}));
        if(props.alignInit.current[verAlign ? 'x' : 'y'] === 0) props.alignInit.current[verAlign ? 'x' : 'y'] = verAlign ? e.clientX : e.clientY;
        else if(Math.abs(verAlign ? e.clientX : e.clientY - props.alignInit.current[verAlign ? 'x' : 'y']) >= ALIGN_THRESHOLD) {
            dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {[type]: 0})));
            props.alignInit.current[verAlign ? 'x' : 'y'] = 0;
            setAxis('both');
        }
    }
    const dragStart = (e: any, data: DraggableData) => {
        e.stopPropagation();
        e.preventDefault();
        setAdjusting(true);
        clear();
    }
    const drag = (e: any, data: DraggableData) => {
        e.stopPropagation();
        e.preventDefault();
        let leftAlign = align.left, rightAlign = align.right, topAlign = align.top, bottomAlign = align.bottom, midHorAlign = align.midHor, midVerAlign = align.midVer;
        if(leftAlign) dragAlign('left', leftAlign, data, e);
        else if(rightAlign) dragAlign('right', rightAlign - parseInt(component.style.width), data, e);
        else if(midVerAlign) dragAlign('midVer', midVerAlign - parseInt(component.style.width) / 2, data, e);
        if(topAlign) dragAlign('top', topAlign, data, e);
        else if(bottomAlign) dragAlign('bottom', bottomAlign - parseInt(component.style.height), data, e);
        else if(midHorAlign) dragAlign('midHor', midHorAlign - parseInt(component.style.height) / 2, data, e);
        if(!leftAlign && !rightAlign && !midVerAlign && !topAlign && !bottomAlign && !midHorAlign) {
            dispatch(setComponentPosition({pageKey: props.pageKey, componentKey: props.componentKey, x: data.x, y: data.y}));
            dispatch(setSelectedPosition({
                left: component.x, 
                right: component.x + parseInt(component.style.width), 
                top: component.y, 
                bottom: component.y + parseInt(component.style.height), 
                midHor: Math.floor(component.y + parseInt(component.style.height) / 2), 
                midVer: Math.floor(component.x + parseInt(component.style.width) / 2), 
            }));
        }
    }
    const dragStop = (e: any, data: DraggableData) => {
        e.stopPropagation();
        e.preventDefault();
        setAdjusting(false);
        clear();
        checkSwitcher();
    }
    const inSwitcher = (componentX: number, componentY: number, componentWidth: any, componentHeight: any, switcherX: number, switcherY: number, switcherWidth: number, switcherHeight: number) => {
        const centerX = componentX + componentWidth / 2;
        const centerY = componentY + componentHeight / 2;
        return ((centerX > switcherX) && (centerX < (switcherX + switcherWidth)) && (centerY > switcherY) && (centerY < (switcherY + switcherHeight)));
    }
    const resizeStart = (e: any, data: DraggableData, type: string) => {
        setAdjusting(true);
        clear();
        props.posInit.current.left = component.x;
        props.posInit.current.right = component.x + parseInt(component.style.width);
        props.posInit.current.top = component.y;
        props.posInit.current.bottom = component.y + parseInt(component.style.height);
    }
    const resize = (e: any, data: DraggableData, type: string) => {
        const newComponent = JSON.parse(JSON.stringify(component));
        let leftAlign = align.left, rightAlign = align.right, topAlign = align.top, bottomAlign = align.bottom, midHorAlign = align.midHor, midVerAlign = align.midVer;
        if(type === "topleft") {
            if(leftAlign && props.alignInit.current.x === 0) props.alignInit.current.x = e.clientX;
            if(topAlign && props.alignInit.current.y === 0) props.alignInit.current.y = e.clientY;
            if(props.alignInit.current.x !== 0 && Math.abs(props.alignInit.current.x - e.clientX) >= ALIGN_THRESHOLD) {
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {left: 0})));
                props.alignInit.current.x = 0;
            }
            if(props.alignInit.current.y !== 0 && Math.abs(props.alignInit.current.y - e.clientY) >= ALIGN_THRESHOLD) {
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {top: 0})));
                props.alignInit.current.y = 0;
            }
            newComponent.x = leftAlign || data.x;
            newComponent.y = topAlign || data.y;
            newComponent.style.width = props.posInit.current.right - (leftAlign || data.x);
            newComponent.style.height = props.posInit.current.bottom - (topAlign || data.y);
            dispatch(setSelectedPosition({
                left: leftAlign || data.x, 
                top: topAlign || data.y, 
            }));
        }
        else if(type === "topright") {
            if(rightAlign && props.alignInit.current.x === 0) props.alignInit.current.x = e.clientX;
            if(topAlign && props.alignInit.current.y === 0)props.alignInit.current.y = e.clientY;
            if(props.alignInit.current.x !== 0 && Math.abs(props.alignInit.current.x - e.clientX) >= ALIGN_THRESHOLD) {
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {right: 0})));
                props.alignInit.current.x = 0;
            }
            if(props.alignInit.current.y !== 0 && Math.abs(props.alignInit.current.y - e.clientY) >= ALIGN_THRESHOLD) {
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {top: 0})));
                props.alignInit.current.y = 0;
            }
            newComponent.y = topAlign || data.y;
            newComponent.style.width = (rightAlign || data.x) - props.posInit.current.left;
            newComponent.style.height = props.posInit.current.bottom - (topAlign || data.y);
            dispatch(setSelectedPosition({
                right: rightAlign || data.x, 
                top: topAlign || data.y, 
            }));
        }
        else if(type === "bottomleft") {
            if(leftAlign && props.alignInit.current.x === 0) props.alignInit.current.x = e.clientX;
            if(bottomAlign && props.alignInit.current.y === 0)props.alignInit.current.y = e.clientY;
            if(props.alignInit.current.x !== 0 && Math.abs(props.alignInit.current.x - e.clientX) >= ALIGN_THRESHOLD) {
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {left: 0})));
                props.alignInit.current.x = 0;
            }
            if(props.alignInit.current.y !== 0 && Math.abs(props.alignInit.current.y - e.clientY) >= ALIGN_THRESHOLD) {
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {bottom: 0})));
                props.alignInit.current.y = 0;
            }
            newComponent.x = leftAlign || data.x;
            newComponent.style.width = props.posInit.current.right - (leftAlign || data.x);
            newComponent.style.height = (bottomAlign || data.y) - props.posInit.current.top;
            dispatch(setSelectedPosition({
                left: leftAlign || data.x, 
                bottom: bottomAlign || data.y, 
            }));
        }
        else if(type === "bottomright") {
            if(rightAlign && props.alignInit.current.x === 0) props.alignInit.current.x = e.clientX;
            if(bottomAlign && props.alignInit.current.y === 0)props.alignInit.current.y = e.clientY;
            if(props.alignInit.current.x !== 0 && Math.abs(props.alignInit.current.x - e.clientX) >= ALIGN_THRESHOLD) {
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {right: 0})));
                props.alignInit.current.x = 0;
            }
            if(props.alignInit.current.y !== 0 && Math.abs(props.alignInit.current.y - e.clientY) >= ALIGN_THRESHOLD) {
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {bottom: 0})));
                props.alignInit.current.y = 0;
            }
            newComponent.style.width = (rightAlign || data.x) - props.posInit.current.left;
            newComponent.style.height = (bottomAlign || data.y) - props.posInit.current.top;
            dispatch(setSelectedPosition({
                right: rightAlign || data.x,
                bottom: bottomAlign || data.y, 
            }));
        }
        dispatch(setComponent({pageKey: props.pageKey, componentKey: props.componentKey, component: newComponent}));
    }
    const resizeStop = (e: any, data: DraggableData, type: string) => {
        setAdjusting(false);
        clear();
        checkSwitcher();
    }

    return <>
        <Draggable
            bounds={{left: 0, right: canvas.offsetWidth - parseInt(component.style.width), top: 0, bottom: undefined}}
            grid={[1,1]}
            axis={axis}
            offsetParent={canvas}
            position={{x: component.x, y: component.y}}
            onStart={dragStart}
            onDrag={drag}
            onStop={dragStop}
            onMouseDown={selectComponent}
            defaultClassName="draggable"
        >
            <div 
                style={{
                    width: parseInt(component.style.width) + 'px', 
                    height: parseInt(component.style.height) + 'px', 
                    border: selectedComponentKey === props.componentKey ? '1px solid #2680eb' : '0px solid transparent',
                    //border: '1px solid blue'
                }}
            >
                <ReactElement pageKey={props.pageKey} componentKey={props.componentKey} type={component.type} source={component} nodeRef={reactElementRef}/>
            </div>
        </Draggable>
        <LineHor adjusting={adjusting} top={component.y}/>
        <LineHor adjusting={adjusting} top={Math.floor(component.y + parseInt(component.style.height) / 2)}/>
        <LineHor adjusting={adjusting} top={component.y + parseInt(component.style.height)}/>
        <LineVer adjusting={adjusting} left={component.x} canvasRef={props.canvasRef}/>
        <LineVer adjusting={adjusting} left={Math.floor(component.x + parseInt(component.style.width) / 2)} canvasRef={props.canvasRef}/>
        <LineVer adjusting={adjusting} left={component.x + parseInt(component.style.width)} canvasRef={props.canvasRef}/>
        <Draggable
            bounds={{left: 0, top: 0, right: component.x + parseInt(component.style.width) - 10, bottom: component.y + parseInt(component.style.height) - 10}}
            axis={axis}
            grid={[1,1]}
            offsetParent={canvas}
            position={{x: component.x - 1.5, y: component.y - 1.5}}
            onStart={(e, data) => resizeStart(e, data, 'topleft')}
            onDrag={(e, data) => resize(e, data, 'topleft')}
            onStop={(e, data) => resizeStop(e, data, 'topleft')}
            onMouseDown={(e) => e.stopPropagation()}
            defaultClassName="draggable"
            defaultClassNameDragging='circle-dragging'
        >
            <div className='canvas-component-circle' style={{
                display: selectedComponentKey === props.componentKey ? 'block' : 'none',
            }}></div>
        </Draggable>
        <Draggable
            bounds={{left: component.x + 10, top: 0, right: canvas.offsetWidth - 6, bottom: component.y + parseInt(component.style.height) - 10}}
            axis={axis}
            grid={[1,1]}
            offsetParent={canvas}
            position={{x: component.x + parseInt(component.style.width) - 3, y: component.y - 1.5}}
            onStart={(e, data) => resizeStart(e, data, 'topright')}
            onDrag={(e, data) => resize(e, data, 'topright')}
            onStop={(e, data) => resizeStop(e, data, 'topright')}
            onMouseDown={(e) => e.stopPropagation()}
            defaultClassName="draggable"
            defaultClassNameDragging='circle-dragging'
        >
            <div className='canvas-component-circle' style={{
                display: selectedComponentKey === props.componentKey ? 'block' : 'none',
            }}></div>
        </Draggable>
        <Draggable
            bounds={{left: 0, top: component.y + 10, right: component.x + parseInt(component.style.width) - 10, bottom: canvas.scrollHeight - 6}}
            axis={axis}
            grid={[1,1]}
            offsetParent={canvas}
            position={{x: component.x - 1.5, y: component.y + parseInt(component.style.height) - 3}}
            onStart={(e, data) => resizeStart(e, data, 'bottomleft')}
            onDrag={(e, data) => resize(e, data, 'bottomleft')}
            onStop={(e, data) => resizeStop(e, data, 'bottomleft')}
            onMouseDown={(e) => e.stopPropagation()}
            defaultClassName="draggable"
            defaultClassNameDragging='circle-dragging'
        >
            <div className='canvas-component-circle' style={{
                display: selectedComponentKey === props.componentKey ? 'block' : 'none',
            }}></div>
        </Draggable>
        <Draggable
            bounds={{left: component.x + 10, top: component.y + 10, right: canvas.offsetWidth - 6, bottom: canvas.scrollHeight - 6}}
            axis={axis}
            grid={[1,1]}
            offsetParent={canvas}
            position={{x: component.x + parseInt(component.style.width) - 3, y: component.y + parseInt(component.style.height) - 3}}
            onStart={(e, data) => resizeStart(e, data, 'bottomright')}
            onDrag={(e, data) => resize(e, data, 'bottomright')}
            onStop={(e, data) => resizeStop(e, data, 'bottomright')}
            onMouseDown={(e) => e.stopPropagation()}
            defaultClassName="draggable"
            defaultClassNameDragging='circle-dragging'
        >
            <div className='canvas-component-circle' style={{
                display: selectedComponentKey === props.componentKey ? 'block' : 'none',
            }}></div>
        </Draggable>
        <div className='canvas-component-setters' 
        style={{
            display: (selectedComponentKey === props.componentKey && !adjusting) ? "block" : "none", 
            left: (component.x + parseInt(component.style.width) < 408 - 8 - 32) ? component.x + parseInt(component.style.width) + 8 + "px" : (408 - 40) + "px",
            top: (component.y + parseInt(component.style.width) < 408 - 8 - 32) ? component.y + "px" : component.y + "px"}}>
            {renderSetterIcons(component.type)}
        </div>
    </>
}