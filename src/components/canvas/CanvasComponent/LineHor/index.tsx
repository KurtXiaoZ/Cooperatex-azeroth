import { useState, useEffect } from 'react';
import './index.less';
import { ALIGN_THRESHOLD } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import store from '../../../../redux/store';
import { setAlign } from '../../../../redux/canvasReducer';

/**
 * CanvasComponent的水平辅助线
 * 
 * @props top 相对于Canvas画布的top偏移量
 * @props verHorLines 一个对象，通过top、left值，确定当前正在拖动或缩放的元素的四条辅助线的位置，通过与该对象对比，决定当前这条辅助线是否显示
 * @props adjusting 判断这条辅助线所属的CanvasComponent组件是否正在被拖拽或缩放，如果是的话，这条辅助线不显示
 * @props alignRef 记录当前与辅助线对齐情况的ref对象
 * @returns CanvasComponent的水平辅助线
 */
export function LineHor(props: any) {
    const [displayLine, setDisplayLine] = useState(false);
    const top = useSelector((state: RootState) => state.canvas.selectedPosition.top);
    const bottom = useSelector((state: RootState) => state.canvas.selectedPosition.bottom);
    const midHor = useSelector((state: RootState) => state.canvas.selectedPosition.midHor);
    const dispatch = useDispatch();
    // 判断是否显示该条水平辅助线
    useEffect(() => {
        // adjusting表示本条辅助线属于正在被操作的元素，不显示
        if(props.adjusting) setDisplayLine(false);  
        else {
            let align = false;
            // 当前正在移动或者拖放的元素的上边界靠近本条辅助线，本条辅助线显示，并且当前正在操作的元素的上边界和本条辅助线对齐
            if(Math.abs(top - parseInt(props.top)) <= ALIGN_THRESHOLD) {
                align = true;
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {top: parseInt(props.top)})));
                setDisplayLine(true);
            }
            // 当前正在移动或者拖放的元素的下边界靠近本条辅助线，本条辅助线显示，并且当前正在操作的元素的下边界和本条辅助线对齐
            if(Math.abs(bottom - parseInt(props.top)) <= ALIGN_THRESHOLD) {
                align = true;
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {bottom: parseInt(props.top)})));
                setDisplayLine(true);
            }
            if(Math.abs(midHor - parseInt(props.top)) <= ALIGN_THRESHOLD) {
                align = true;
                dispatch(setAlign(Object.assign({}, store.getState().canvas.align, {midHor: parseInt(props.top)})));
                setDisplayLine(true);
            }
            // 当前正在移动或者拖放的元素的上或下边界都远离本条辅助线，本条辅助线不显示，不对齐
            if(!align) setDisplayLine(false);
        }
    }, [top, bottom, props.adjusting]);
    return <div className='canvas-component-line-hor' style={{top: props.top + 'px', display: displayLine ? "block" : "none"}}></div>;
}