import './index.less';
import { ReactElement } from '../ReactElement';
import { useEffect, useRef, useState } from 'react';
import { LineVer } from './LineVer';
import { LineHor } from './LineHor';
import { ALIGN_THRESHOLD } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { setSelectedPosition, setSelectedKey, setAlign, setSetterType } from 'redux/canvasReducer';
import { setComponent, setComponentHeight, setComponentPosition, setComponentStyle, setComponentWidth } from 'redux/pagesReducer';
import store from '../../../redux/store';
import { renderSetterIcons } from '../specificComponents';
import Draggable, { DraggableData } from 'react-draggable';
import { MenuComponent } from './normalComponent/MenuComponent';
import { LineComponent } from './normalComponent/LineComponent';
import { DefaultComponent } from './normalComponent/DefaultComponent';
import { SwitcherComponent } from './normalComponent/SwitcherComponent';
import { IRComponent } from './normalComponent/IRComponent';


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
export function CanvasComponent(props: any) {
    const component: any = useSelector((state: RootState) => state.pages[props.pageKey].components[props.componentKey]);

    const render = () => {
        switch(component.type) {
            case 'menu':
                return <MenuComponent canvasRef={props.canvasRef} alignInit={props.alignInit} posInit={props.posInit} componentKey={props.componentKey} pageKey={props.pageKey}/>
            case 'line': case 'dashLine': case 'dotLine': case 'arrowLine1': case 'arrowLine2':
                return <LineComponent canvasRef={props.canvasRef} alignInit={props.alignInit} posInit={props.posInit} componentKey={props.componentKey} pageKey={props.pageKey}/>
            case 'switcher1': case 'switcher2':
                return <SwitcherComponent canvasRef={props.canvasRef} alignInit={props.alignInit} posInit={props.posInit} componentKey={props.componentKey} pageKey={props.pageKey}/>
            case 'unmergedClick': case 'unmergedNonclick': case 'mergedClick': case 'mergedNonclick':
                return <IRComponent canvasRef={props.canvasRef} alignInit={props.alignInit} posInit={props.posInit} componentKey={props.componentKey} pageKey={props.pageKey}/>
            default:
                return <DefaultComponent canvasRef={props.canvasRef} alignInit={props.alignInit} posInit={props.posInit} componentKey={props.componentKey} pageKey={props.pageKey}/>
        }
    }

    return render();
}

export function overlap(left1: number, right1: number, top1: number, bottom1: number, left2: number, right2: number, top2: number, bottom2: number) {
    if(left1 < left2 && left2 < right1) return true;
    if(left1 < right2 && right2 < right1) return true;
    if(top1 < top2 && top2 < bottom1) return true;
    if(top1 < bottom2 && bottom2 < bottom1) return true;
    return false;
}