import { defaultMenuStyle } from 'components/canvas/specificComponents/menu/Menu';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { copyPageKey, deletePageKey, reorderPageKeys, setEdittingPage, setSelectedPage } from 'redux/frontendsReducer';
import { addComponent, copyPage, deletePage, removeComponent, renamePage } from 'redux/pagesReducer';
import store, { RootState } from 'redux/store';
import uniqid from 'uniqid';
import { PopUp } from '../PopUp';

import './index.less';

export function RightMenuMainPage(props: any) {
    const pageNum = useSelector((state: RootState) => state.frontends[props.frontendKey]['pages']['mainPageKeys'].length);
    const selectedPage = useSelector((state: RootState) => state.frontends[props.frontendKey]['pages']['selectedPage']);
    const edittingPage = useSelector((state: RootState) => state.frontends[props.frontendKey]['pages']['edittingPage']);
    const pageName = useSelector((state: RootState) => state.pages[props.pageKey]['name']);
    const [curDragging, setCurDragging] = useState(false);
    const [contextMenuLeft, setContextMenuLeft] = useState(0);
    const [contextMenuTop, setContextMenuTop] = useState(0);
    const [warning, setWarning] = useState(false);

    const inputRef: any = useRef();
    const dispatch = useDispatch();
    let timer = 0;
    let timeout: any = null;

    const onMouseEnter = () => {
        if(props.overallDragging) props.setInsertKey(props.pageKey);
    }

    useEffect(() => {
        if(edittingPage === props.pageKey) {
            document.onmousedown = () => {
                dispatch(renamePage({pageKey: props.pageKey, name: inputRef.current.value || pageName}));
                dispatch(setEdittingPage({frontendKey: props.frontendKey, pageKey: ""}));
                document.onmousedown = null;
            }
        }
    }, [edittingPage, props.pageKey]);

    useEffect(() => {
        const blockEvents = document.getElementById('block-events');
        if(contextMenuLeft !== 0 || contextMenuTop !== 0) {
            blockEvents?.setAttribute("style", "display: block");
            document.onclick = () => {
                setContextMenuLeft(0);
                setContextMenuTop(0);
                document.onclick = null;
            }
        }
        else blockEvents?.setAttribute("style", "display: none");
    }, [contextMenuLeft, contextMenuTop]);

    const handleDragStart = () => {
        timer = Date.now();
    }
    const handleDrag = () => {
        if(!curDragging) setCurDragging(true);
        if(!props.overallDragging) props.setOverallDragging(true);
    }
    const handleDragStop = (e: any) => {
        if(Math.abs(timer - Date.now()) < 300) {
            if(timeout === null) {
                timeout = window.setTimeout(() => {
                  timeout = null;
                  dispatch(setSelectedPage({key: props.frontendKey, selected: props.pageKey}));
                }, 300);
            }
        }
        else {
            setCurDragging(false);
            props.setOverallDragging(false);
            if(props.insertKey !== "") {
                let mainPageKeys = store.getState().frontends[props.frontendKey].pages.mainPageKeys;
                // non main page --> main page
                if(mainPageKeys.indexOf(props.pageKey) === -1 && mainPageKeys.indexOf(props.insertKey) !== -1) {
                    dispatch(addComponent({
                        pageKey: props.pageKey, 
                        component: {
                            type: 'menu',
                            style: defaultMenuStyle,
                            x: 0,
                            y: 0,
                        },
                        componentKey: props.pageKey + uniqid(),
                    }));
                }
                // main page --> non main page
                else if(mainPageKeys.indexOf(props.pageKey) !== -1 && mainPageKeys.indexOf(props.insertKey) === -1) {
                    let key = "";
                    let components = store.getState().pages[props.pageKey].components;
                    for(let componentKey in components) {
                        if(components[componentKey].type === 'menu') {
                            key = componentKey;
                            break;
                        }
                    }
                    if(key !== "") {
                        dispatch(removeComponent({pageKey: props.pageKey, componentKey: key}));
                    }
                    console.log(store.getState().pages);
                }
                dispatch(reorderPageKeys({frontendKey: props.frontendKey, pageKey: props.pageKey, insertKey: props.insertKey}));
            }
            props.setInsertKey("");
        }
    }
    const editName = () => {
        window.clearTimeout(timeout);
        timeout = null;
        dispatch(setEdittingPage({frontendKey: props.frontendKey, pageKey: props.pageKey}));
    }
    const handleContextMenu = (e: any) => {
        e.preventDefault();
        let left = e.nativeEvent.offsetX;
        if(left + 168 > 316) left = 316 - 168
        setContextMenuLeft(left);
        setContextMenuTop(e.nativeEvent.offsetY + 40 * props.pageIndex);
    }

    const copy = () => {
        let pageKey = uniqid();
        dispatch(copyPage({oldKey: props.pageKey, newKey: pageKey}));
        dispatch(copyPageKey({frontendKey: props.frontendKey, oldKey: props.pageKey, newKey: pageKey}));
    }
    
    const displayWarning = (e: any) => {
        e.stopPropagation();
        setWarning(true);
    }
    const deleteConfirm = () => {
        setWarning(false);
        dispatch(deletePageKey({frontendKey: props.frontendKey, pageKey: props.pageKey}));
        dispatch(deletePage(props.pageKey));
        const blockEvents = document.getElementById('block-events');
        blockEvents?.setAttribute("style", "display: none");
    }
    const deleteCancel = () => {
        const blockEvents = document.getElementById('block-events');
        blockEvents?.setAttribute("style", "display: none");
        setWarning(false);
    }

    return <>
    <div className='right-menu-main-page'>
        <div 
            onMouseEnter={onMouseEnter}
            className='right-menu-main-page-placeholder'
            style={{
                display: edittingPage === props.pageKey ? 'none' : 'block',
                borderTop: props.insertKey === props.pageKey ? '2px solid #D790F9' : '0px solid transparent',
                background: selectedPage === props.pageKey ? '#393939' : 'transparent',
                color: selectedPage === props.pageKey ? 'white' : '#FFFFFF99',
                zIndex: props.overallDragging ? 7 : 1,
            }}
        >
            {pageName}
        </div>
        {edittingPage === props.pageKey ? 
        <input 
            ref={inputRef}
            className='right-menu-main-page-rename' 
            placeholder={pageName}
            onMouseDown={(e) => e.nativeEvent.stopImmediatePropagation()}
        />
        :
        <Draggable
            axis='y'
            disabled={pageNum <= 1}
            onStart={handleDragStart}
            onStop={handleDragStop}
            onDrag={handleDrag}
            position={{x: 0, y: 0}}
        >
            <div 
                onClick={pageNum <= 1 ? () => dispatch(setSelectedPage({key: props.frontendKey, selected: props.pageKey})) : undefined}
                onContextMenu={handleContextMenu}
                onDoubleClick={editName}
                className='right-menu-main-page-draggable'
                style={{
                    background: curDragging ? '#3C3C3C' : 'transparent',
                    opacity: curDragging ? 0.5 : 0,
                }}
            >
                {pageName}
            </div>
        </Draggable>}
    </div>
    {(contextMenuLeft !== 0 || contextMenuTop !== 0) && ReactDOM.createPortal(<div 
        className='right-menu-context-menu'
        style={{
            top: contextMenuTop + 'px',
            left: contextMenuLeft + 'px',
        }}
    >
        <span className='right-menu-context-menu-option' onClick={copy}>Create copy</span>
        <span className='right-menu-context-menu-option' onClick={() => dispatch(setEdittingPage({frontendKey: props.frontendKey, pageKey: props.pageKey}))}>Rename</span>
        <span className='right-menu-context-menu-option' 
            style={{opacity: pageNum === 1 ? 0.5 : 1}}
            onClick={pageNum <= 1 ? undefined : displayWarning}
        >Delete</span>
    </div>, document.getElementsByClassName('right-menu-pages-main-content')[0])}
    <PopUp
        text={"This page and all of its content will be deleted, please confirm whether to delete."}
        display={warning} 
        onConfirm={deleteConfirm} 
        onCancel={deleteCancel}
    />
    </>
}