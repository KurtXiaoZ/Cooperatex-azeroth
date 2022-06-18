import { useDispatch, useSelector } from 'react-redux';
import { setSetterType } from 'redux/canvasReducer';
import { RootState } from 'redux/store';
import Selected from './selected.svg';
import Unselected from './unselected.svg';

export function ArrowSetterStyleIcon(props: any) {
    const setterType = useSelector((state: RootState) => state.canvas.setterType);
    const dispatch = useDispatch();
    const displaySetter = (e: any) => {
        e.stopPropagation();
        dispatch(setSetterType('arrowStyle'));
    }
    return <img src={setterType === 'arrowStyle' ? Selected : Unselected} style={{display: 'block'}} onMouseDown={displaySetter}/>
}