import MenuIcon1 from './menuIcon1.svg';
import MenuIcon2 from './menuIcon2.svg';
import CloseIcon1 from './closeIcon1.svg';
import CloseIcon2 from './closeIcon2.svg';
import './index.less';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { RootState } from 'redux/store';
import { MenuOption } from '../MenuOption';

export function Menu(props: any) {
    const [showOptions, setShowOptions] = useState(false);
    const mainPageKeys = useSelector((state: RootState) => state.frontends[props.frontendKey].pages.mainPageKeys);

    const displayOptions = (e: any) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setShowOptions(!showOptions);
    }

    const renderOptions = () => {
        return mainPageKeys.map((mainPageKey: string) => {
            return <MenuOption style={props.style} pageKey={mainPageKey}/>
        }); 
    }

    return <>
        <div className='menu-component' style={{
            backgroundColor: props.style.backgroundColor,
            borderBottom: props.style.borderBottom,
        }}>
            {showOptions ? 
                <img src={props.style.backgroundColor === undefined || props.style.backgroundColor === '#383238' ? CloseIcon1 : CloseIcon2} className='menu-component-icon' onClick={displayOptions}/> :
                <img src={props.style.backgroundColor === undefined || props.style.backgroundColor === '#383238' ? MenuIcon1 : MenuIcon2} className='menu-component-icon' onClick={displayOptions}/>
            }
        </div>
        <AnimateHeight className='menu-component-options' 
            duration={ 500 }
            height={ showOptions ? props.canvasRef.current.scrollHeight - 41 : 0 }
            style={{
            backgroundColor: props.style.backgroundColor,
            transition: showOptions ? 'max-height 0.25s ease-in' : 'max-height 0.15s ease-out'
        }}>
            {renderOptions()}
         </AnimateHeight>
    </>
}

export const defaultMenuStyle = {
    position: 'absolute',
    height: 'auto',
    width: '418px',
}