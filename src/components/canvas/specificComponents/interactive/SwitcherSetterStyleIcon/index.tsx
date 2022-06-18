import { useDispatch, useSelector } from 'react-redux';
import { setSetterType } from 'redux/canvasReducer';
import { RootState } from 'redux/store';
import Selected from './selected.svg';
import Unselected from './unselected.svg';

export function SwitcherSetterStyleIcon(props: any) {
    const setterType = useSelector((state: RootState) => state.canvas.setterType);
    const dispatch = useDispatch();
    const displaySetter = (e: any) => {
        e.stopPropagation();
        dispatch(setSetterType('switcherStyle'));
    }
    return <img src={setterType === 'switcherStyle' ? Selected : Unselected} style={{display: 'block'}} onMouseDown={displaySetter}/>
}