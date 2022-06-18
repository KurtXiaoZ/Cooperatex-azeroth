import MenuIcon from './menuIcon.svg';
import CloseIcon from './closeIcon.svg';
import './index.less';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Menu(props: any) {
    console.log(props.pageKey);
    const [showOptions, setShowOptions] = useState(true);

    const displayOptions = (e: any) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setShowOptions(!showOptions)
    }

    const renderOptions = () => {
        return props.mainPageKeys.map((mainPageKey: string, i: number) => {
            return <Link to={`/${mainPageKey}`}><div className='menu-option'>{props.mainPageNames[i]}</div></Link>;
        }); 
    }

    return <>
        <div className='menu'>
            {showOptions ? 
                <img src={CloseIcon} className='menu-icon' onClick={displayOptions}/> :
                <img src={MenuIcon} className='menu-icon' onClick={displayOptions}/>
            }
        </div>
        <div className='menu-options' style={{display: showOptions ? "block" : "none"}}>
            {renderOptions()}
        </div>
    </>
}