import { useDispatch } from 'react-redux';
import { setSetterType } from 'redux/canvasReducer';
import './index.less';
import CloseIcon from '../../icons/close.svg';

export function Edit(props: any) {
    const dispatch = useDispatch();


    return <>
        <div className='setter-header'>
            <span className='setter-header-title'>Text Settings</span>
            <img className='setter-header-close' onClick={() => dispatch(setSetterType(""))} src={CloseIcon} />
        </div>
        <div className='setter-content'>
            <div className='setter-content-color'>
                
            </div>
        </div>
    </>
}