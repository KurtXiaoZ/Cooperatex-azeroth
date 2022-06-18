import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { copyPageKey, deletePageKey, renameSubFolder, setEdittingPage } from 'redux/frontendsReducer';
import { copyPage, deletePage } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import uniqid from 'uniqid';
import TriangleIcon from '../icons/triangle.svg';
import { RightMenuFolderPage } from '../RightMenuFolderPage';
import './index.less';
import { PopUp } from '../PopUp';

export function RightMenuFolder(props: any) {
    const edittingPage = useSelector((state: RootState) => state.frontends[props.frontendKey]['pages']['edittingPage']);
    const folderName = useSelector((state: RootState) => state.frontends[props.frontendKey]['pages']['subFolders'][props.pageKey]['name']);
    const folderPages = useSelector((state: RootState) => state.frontends[props.frontendKey]['pages']['subFolders'][props.pageKey]['subpages']);
    const [contextMenuLeft, setContextMenuLeft] = useState(0);
    const [contextMenuTop, setContextMenuTop] = useState(0);
    const [showFolderPages, setShowFolderPages] = useState(false);
    const [hoverFolderPages, setHoverFolderPages] = useState(false);
    const [warning, setWarning] = useState(false);

    const inputRef: any = useRef();
    const dispatch = useDispatch();

    const onMouseEnter = () => {
        if(props.overallDragging) {
            //setInserting(true);
            props.setInsertKey(props.pageKey);
        }    
    }

    useEffect(() => {
        if(edittingPage === props.pageKey) {
            document.onmousedown = () => {
                dispatch(renameSubFolder({frontendKey: props.frontendKey, pageKey: props.pageKey, name: inputRef.current.value || folderName}));
                dispatch(setEdittingPage({frontendKey: props.frontendKey, pageKey: ""}));
                document.onmousedown = null;
            }
        }
    }, [edittingPage, props.pageKey]);

    const editName = () => {
        dispatch(setEdittingPage({frontendKey: props.frontendKey, pageKey: props.pageKey}));
    }

    const displayPages = () => {
        setShowFolderPages(!showFolderPages);
    }

    useEffect(() => {
        if(contextMenuLeft !== 0 || contextMenuTop !== 0) {
            document.onclick = () => {
                setContextMenuLeft(0);
                setContextMenuTop(0);
                document.onclick = null;
            }
        }
    }, [contextMenuLeft, contextMenuTop]);

    const handleContextMenu = (e: any) => {
        e.preventDefault();
        let left = e.nativeEvent.offsetX;
        if(left + 168 > 316) left = 316 - 168
        setContextMenuLeft(left);
        setContextMenuTop(e.nativeEvent.offsetY + 40 * props.pageIndex);
    }
    const displayWarning = (e: any) => {
        e.stopPropagation();
        setWarning(true);
    }
    const deleteConfirm = () => {
        setWarning(false);
        dispatch(deletePageKey({frontendKey: props.frontendKey, pageKey: props.pageKey}));
        for(let i = 0; i < folderPages.length; ++i) {
            dispatch(deletePage(folderPages[i]));
        }
    }
    const deleteCancel = () => {
        setWarning(false);
    }

    const copy = () => {
        let pageKey = uniqid();
        dispatch(copyPage({oldKey: props.pageKey, newKey: pageKey}));
        dispatch(copyPageKey({frontendKey: props.frontendKey, oldKey: props.pageKey, newKey: pageKey}));
    }

    const renderFolderPages = (subpages: any) => {
        return subpages.map((subpage: any, i: number) => {
            return <RightMenuFolderPage 
                key={subpage}
                pageIndex={i}
                pageKey={subpage}
                frontendKey={props.frontendKey}
                insertKey={props.insertKey}
                setInsertKey={props.setInsertKey}
                overallDragging={props.overallDragging}
                setOverallDragging={props.setOverallDragging}
            />
        })
    }

    return <div>
        {edittingPage === props.pageKey ? 
        <input 
            ref={inputRef}
            className='right-menu-sub-page-folder-rename' 
            placeholder={folderName}
            onMouseDown={(e) => e.nativeEvent.stopImmediatePropagation()}
        />
        :
        <div
            onClick={displayPages}
            onContextMenu={handleContextMenu}
            onMouseEnter={onMouseEnter}
            onDoubleClick={editName}
            className={props.insertKey === props.pageKey? 'right-menu-sub-page-folder-inserting' : 'right-menu-sub-page-folder'}
        >
            <div 
                className='right-menu-sub-page-folder-icon'
                onMouseEnter={() => setHoverFolderPages(true)}
                onMouseOut={() => setHoverFolderPages(false)}
                style={{opacity: hoverFolderPages || showFolderPages ? 1 : 0}}
            >
                <img src={TriangleIcon} style={{
                    transform: showFolderPages ? 'rotate(90deg)' : 'rotate(0deg)'
                }}/>
            </div>
            <span className='right-menu-sub-page-folder-name'>{folderName}</span>
        </div>}
        <div className='right-menu-sub-page-folder-area' style={{height: showFolderPages ? 40 * folderPages.length + 'px' : '0px'}}>
            {showFolderPages && renderFolderPages(folderPages)}
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
            onClick={displayWarning}
        >Delete</span>
    </div>, document.getElementsByClassName('right-menu-pages-sub-folders')[0])}
    <PopUp
        text={"This folder and all of its content will be deleted, please confirm whether to delete."}
        display={warning} 
        onConfirm={deleteConfirm} 
        onCancel={deleteCancel}
    />
    </div>
}