import { SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import './index.less';
import MenuIcon1 from './icon1.svg';
import MenuIcon2 from './icon2.svg';
import MenuIcon3 from './icon3.svg';
import SelectedIcon from './selected.svg';
import store from 'redux/store';
import { useDispatch } from 'react-redux';
import { setComponentStyle } from 'redux/pagesReducer';
import { useState } from 'react';


export function MenuSetterStyle(props: any) {
    const rootState = store.getState();
    const pages = rootState.pages;
    const frontendKey = rootState.rightMenu.frontendKeys[rootState.rightMenu.selectedFrontEnd];
    const frontend = rootState.frontends[frontendKey].pages;
    const pageKey = frontend.selectedPage;
    const canvas = rootState.pages[pageKey].canvas;
    const componentKey = rootState.canvas.selectedKey;
    const [selected, setSelected] = useState(1);

    const dispatch = useDispatch();

    const setOption1 = () => {
        dispatch(setComponentStyle({pageKey: pageKey, componentKey: componentKey, style: {
            backgroundColor: '#383238',
            color: 'white',
            borderBottom: '1px solid #FFFFFF33',
            boxShadow: 'none',
        }}));
        setSelected(1);
    }

    const setOption2 = () => {
        dispatch(setComponentStyle({pageKey: pageKey, componentKey: componentKey, style: {
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #0000001A',
            boxShadow: 'none',
            color: 'black',
        }}));
        setSelected(2);
    }

    const setOption3 = () => {
        dispatch(setComponentStyle({pageKey: pageKey, componentKey: componentKey, style: {
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #0000001A',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.05)',
            color: 'black',
        }}));
        setSelected(3);
    }

    return <>
        <SetterHeader title={'Style'}/>
        <div className='menu-setter-content'>
            <p className='menu-setter-content-title'>Theme Menus</p>
            <div className='menu-setter-style-option-1' onClick={setOption1}>
                <img src={MenuIcon1} className='menu-setter-style-icon'/>
                <img src={SelectedIcon} className='menu-setter-selected' style={{display: selected === 1 ? 'block' : 'none'}}/>
            </div>
            <div className='menu-setter-style-option-2' onClick={setOption2}>
                <img src={MenuIcon2} className='menu-setter-style-icon'/>
                <img src={SelectedIcon} className='menu-setter-selected' style={{display: selected === 2 ? 'block' : 'none'}}/>
            </div>
            <div className='menu-setter-style-option-3' onClick={setOption3}>
                <img src={MenuIcon3} className='menu-setter-style-icon'/>
                <img src={SelectedIcon} className='menu-setter-selected' style={{display: selected === 3 ? 'block' : 'none'}}/>
            </div>
        </div>
    </>
}