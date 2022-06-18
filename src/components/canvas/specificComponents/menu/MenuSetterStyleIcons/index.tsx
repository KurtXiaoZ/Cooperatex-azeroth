import { useDispatch } from 'react-redux';
import { setSetterType } from 'redux/canvasReducer';
import Icon from './icon.svg';


export function MenuSetterStyleIcon(props: any) {
    const dispatch = useDispatch();
    const displaySetter = (e: any) => {
        e.stopPropagation();
        dispatch(setSetterType('menu'));
    }
    return <img src={Icon} draggable={false} onMouseDown={displaySetter}/>
}