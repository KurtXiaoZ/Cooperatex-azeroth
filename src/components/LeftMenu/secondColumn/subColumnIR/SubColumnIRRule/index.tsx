import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedRuleId } from 'redux/irReducer';
import './index.less';

export function SubColumnIRRule(props: any) {
    const canvas: any = document.getElementById('canvas');
    const dispatch = useDispatch();

    const dragStart = (e: any) => {
        document.ondragover = (e) => e.preventDefault();
    }

    const dragRender = (e: any) => {
        document.ondragover = null;
        const scrollTop = canvas?.scrollTop;
        const canvasX = canvas?.getBoundingClientRect().x;
        const canvasY = canvas?.getBoundingClientRect().y;
        const currX = e.nativeEvent.clientX;
        const currY = e.nativeEvent.clientY;
        if(canvasX && canvasY && currX > canvasX && currX < canvasX + canvas.offsetWidth && currY > canvasY && currY < canvasY + canvas.offsetHeight) {
            dispatch(setSelectedRuleId({
                ruleId: props.ruleId,
                x: currX - canvasX,
                y: scrollTop + currY - canvasY
            }))
        }
    }

    const directRender = () => {
        const scrollTop = canvas?.scrollTop;
        const canvasWidth = canvas.offsetWidth;
        const canvasHeight = canvas.offsetHeight;
        dispatch(setSelectedRuleId({
            ruleId: props.ruleId,
            x: Math.floor(parseInt(canvasWidth) / 2),
            y: scrollTop + Math.floor(parseInt(canvasHeight) / 2)
        }))
    }

    return <div 
        className={props.ruleUsed === 0 ? 'sub-column-IR-system-rule' : 'sub-column-IR-system-rule-used'} 
        onClick={directRender} 
        draggable 
        onDragStart={dragStart}
        onDragEnd={dragRender}
    >
        {props.ruleName}
    </div>
}