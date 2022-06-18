import { useDispatch } from 'react-redux';
import { setSetterType } from 'redux/canvasReducer';
import EditIcon from './icons/editIcon.svg';

export function TextTitleIcons(props: any) {
    const dispatch = useDispatch();

    return <>
        <img src={EditIcon} className='canvas-component-setter-icon' onClick={() => dispatch(setSetterType('text_title'))}/>
    </>
}