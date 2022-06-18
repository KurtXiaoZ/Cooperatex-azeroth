import './index.less';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setComponentHeight } from 'redux/pagesReducer';


export function Text(props: any) {
    const dispatch = useDispatch();

    const autoSize = (e: any) => {
        if(props.nodeRef.current.scrollHeight > props.nodeRef.current.offsetHeight) {
            dispatch(setComponentHeight({pageKey: props.pageKey, componentKey: props.componentKey, height: props.nodeRef.current.scrollHeight}));
        }
    }

    return <textarea 
        style={{
            ...props.source.style, 
            //borderRightStyle: 'none',
            //borderBottomStyle: 'none',

            background: 'transparent',
            height: parseInt(props.source.style.height) + 'px',
            width: parseInt(props.source.style.width) + 'px'
        }} 
        ref={props.nodeRef}
        onInput={autoSize}
        className='text-component'
    >
        {props.source.text}
    </textarea>
}