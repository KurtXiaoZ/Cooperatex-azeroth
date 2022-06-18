import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { RightMenuFrontend } from '../RightMenuFrontend';
import CloseIcon from '../../../assets/svgs/closeCreateFrontend.svg';
import uniqid from 'uniqid';
import './index.less';
import { addFrontend, addMainPageKey, setSelectedPage } from 'redux/frontendsReducer';
import { addFrontendKey } from 'redux/rightMenuReducer';
import { addPage } from 'redux/pagesReducer';
import { defaultMenuStyle } from 'components/canvas/specificComponents/menu/Menu';

export function RightMenuFrontends(props: any) {
    const [create, setCreate] = useState(false);
    const inputRef = useRef(null) as any;
    const frontends = useSelector((state: RootState) => state.rightMenu.frontendKeys);
    const dispatch = useDispatch();

    const blockEvents = document.getElementById('block-events');
    
    const renderFrontends = () => {
        let arr = [];
        for(let i = 0; i < frontends.length; ++i) {
            arr.push(<RightMenuFrontend key={frontends[i]} frontendKey={frontends[i]} index={i}/>);
        }
        return arr;
    }
    const showCreate = () => {
        setCreate(true);
        blockEvents?.setAttribute("style", "display: block");
    }
    const closeCreate = () => {
        inputRef.current.value = "";
        setCreate(false);
        blockEvents?.setAttribute("style", "display: none");
    }
    const createFrontend = (e: any) => {
        if(!inputRef.current) return;
        if(inputRef.current['value'] === "") return;
        let frontendKey = uniqid();
        dispatch(addFrontend({key: frontendKey, name: inputRef.current['value']}));
        dispatch(addFrontendKey(frontendKey));
        let mainPageKeyBase = uniqid();
        let menuKey = uniqid('menu');
        for(let i = 1; i <= 3; ++i) {
            dispatch(addMainPageKey({frontendKey: frontendKey, pageKey: mainPageKeyBase + i.toString()}));
            dispatch(addPage({pageKey: mainPageKeyBase + i.toString(), name: `Page${i}`, components: {
                [menuKey + i]: {type: 'menu', style: defaultMenuStyle, x: 0, y: 0}
            }}));
        }
        dispatch(setSelectedPage({key: frontendKey, selected: mainPageKeyBase + '1'}));
        inputRef.current.value = "";
        setCreate(false);
        blockEvents?.setAttribute("style", "display: none");
    }

    return <div className='right-menu-frontends'>
        <div className='right-menu-frontends-collection'>
            {renderFrontends()}
        </div>
         <div className='right-menu-frontends-add' onClick={showCreate}>
             <span className='right-menu-frontends-add-text'>+ Create New</span>
         </div>
         <p className='right-menu-frontends-tips'>Here you can create multiple Frontends to target different user groups</p>
         <div className='right-menu-frontends-create' style={{display: create ? "block" : "none"}}>
            <span className='right-menu-frontends-create-title'>Create new frontend</span>
            <img className='right-menu-frontends-create-close' src={CloseIcon} onClick={closeCreate}/>
            <input className='right-menu-frontends-create-input' placeholder="Insert Frontend name" ref={inputRef}/>
            <span className='right-menu-frontends-create-button' onClick={createFrontend}>Done</span>
         </div>
    </div>
}