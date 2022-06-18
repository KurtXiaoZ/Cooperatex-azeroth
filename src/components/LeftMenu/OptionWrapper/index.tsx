import { borderBottom } from '@mui/system';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedKey, setSetterType } from 'redux/canvasReducer';
import { addComponent } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import './index.less';
import uniqid from 'uniqid';

export function OptionWrapper(props: any) {
    const canvas: any = document.getElementById('canvas');
    const hor: any = document.getElementById('horizontalLine');


    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[state.rightMenu.selectedFrontEnd]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const dispatch = useDispatch();

    const [horizontalLine, setHorizontalLine] = useState(0);

    useEffect(() => {
        if(horizontalLine !== 0) {
            hor.setAttribute('style', `top: ${horizontalLine}px`);
        }
        else hor.setAttribute('style', `top: 0`);
    }, [horizontalLine]);

    const directRender = () => {
        if(props.source === undefined) return;
        const scrollTop = canvas?.scrollTop;
        const canvasWidth = canvas.offsetWidth;
        const canvasHeight = canvas.offsetHeight;
        const source = JSON.parse(JSON.stringify(props.source));
        if(source.type !== 'switcher1' && source.type !== 'switcher2') source['x'] = Math.floor(parseInt(canvasWidth) / 2) - (Math.floor(parseInt(source.style.width) || 0) / 2);
        else source['x'] = 0;
        source['y'] = scrollTop + Math.floor(parseInt(canvasHeight) / 2) - (Math.floor(parseInt(source.style.height) || 0) / 2);
        const componentKey = pageKey + uniqid();
        dispatch(addComponent({
            componentKey: componentKey,
            pageKey: pageKey,
            component: source
        }));
        if(source.type === 'switcher1' || source.type === 'switcher2') {
            dispatch(setSelectedKey(componentKey));
            dispatch(setSetterType('switcherManage'));
        }
    }

    const dragStart = (e: any) => {
        document.ondragover = (e) => e.preventDefault();
    }

    const dragRender = (e: any) => {
        if(props.source === undefined) return;
        setHorizontalLine(0);
        document.ondragover = null;
        const scrollTop = canvas?.scrollTop;
        const canvasX = canvas?.getBoundingClientRect().x;
        const canvasY = canvas?.getBoundingClientRect().y;
        const currX = e.nativeEvent.clientX;
        const currY = e.nativeEvent.clientY;
        if(canvasX && canvasY && currX > canvasX && currX < canvasX + canvas.offsetWidth && currY > canvasY && currY < canvasY + canvas.offsetHeight) {
            const source = JSON.parse(JSON.stringify(props.source));
            if(source.type !== 'switcher1' && source.type !== 'switcher2') source['x'] = currX - canvasX - (Math.floor(parseInt(props.source.style.width) || 0) / 2);
            else source['x'] = 0;
            source['y'] = scrollTop + currY - canvasY;
            const componentKey = pageKey + uniqid();
            dispatch(addComponent({
                componentKey: componentKey,
                pageKey: pageKey,
                component: source
            }));
            if(source.type === 'switcher1' || source.type === 'switcher2') {
                dispatch(setSelectedKey(componentKey));
                dispatch(setSetterType('switcherManage'));
            }
        }
    }

    const drag = (e: any) => {
        const canvasX = canvas?.getBoundingClientRect().x;
        const canvasY = canvas?.getBoundingClientRect().y;
        const currX = e.nativeEvent.clientX;
        const currY = e.nativeEvent.clientY;
        if(canvasX && canvasY && currX > canvasX && currX < canvasX + canvas.offsetWidth && currY > canvasY && currY < canvasY + canvas.offsetHeight) {
            setHorizontalLine(currY - canvasY - 56);
        }
    }


    return <>
        <div 
            className='third-column-option-wrapper' 
            onClick={directRender} 
            draggable 
            onDragStart={dragStart}
            onDrag={(props?.source?.type === 'switcher1' || props?.source?.type === 'switcher2') ? drag : undefined}
            onDragEnd={dragRender}
        >
            {props.children}
        </div>
    </>
}