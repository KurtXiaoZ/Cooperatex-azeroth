import { ReactElement } from '../../ReactElement';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { setSelectedKey, setSetterType } from 'redux/canvasReducer';
import { renderSetterIcons } from '../../specificComponents';

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
export function MenuComponent(props: any) {
    const component: any = useSelector((state: RootState) => state.pages[props.pageKey].components[props.componentKey]);
    const selectedComponentKey: string = useSelector((state: RootState) => state.canvas.selectedKey);
    const dispatch = useDispatch();

    const reactElementRef: any = useRef();

    const selectComponent = (e: any) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        dispatch(setSetterType(''));
        dispatch(setSelectedKey(props.componentKey));
    }

    return <>
        <div className='canvas-component' onMouseDown={selectComponent} style={component.style}>
            <ReactElement canvasRef={props.canvasRef} type={component.type} style={component.style} source={component} nodeRef={reactElementRef}/>
        </div>
        <div className='canvas-component-setters' 
        style={{
            display: (selectedComponentKey === props.componentKey) ? "block" : "none", 
            right: '5px',
            top: '46px'
        }}>
            {renderSetterIcons(component.type)}
        </div>

    </>
}