import { useDispatch, useSelector } from 'react-redux';
import { setSetterType } from 'redux/canvasReducer';
import { RootState } from 'redux/store';
import Selected from './selected.svg';
import Unselected from './unselected.svg';
import Linked from './linked.svg';

export function LinkIcon(props: any) {
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[state.rightMenu.selectedFrontEnd]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const setterType = useSelector((state: RootState) => state.canvas.setterType);
    const dispatch = useDispatch();

    const renderIcon = () => {
        if(setterType === 'link') return <img src={Selected} style={{display: 'block'}} onMouseDown={displaySetter}/>
        else if(component?.linkTo !== undefined) return <img src={Linked} style={{display: 'block'}} onMouseDown={displaySetter}/>
        else return <img src={Unselected} style={{display: 'block'}} onMouseDown={displaySetter}/>
    }

    const displaySetter = (e: any) => {
        e.stopPropagation();
        dispatch(setSetterType('link'));
    }
    return renderIcon()
}