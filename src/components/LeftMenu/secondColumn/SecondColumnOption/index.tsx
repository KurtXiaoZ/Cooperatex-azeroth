import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSecondType } from 'redux/leftMenuReducer';
import { RootState } from 'redux/store';
import './index.less';

import * as Scroll from 'react-scroll';

const scroller = Scroll.scroller;

const SELECT_BACKGROUND = "rgba(255, 255, 255, 0.1)";
const UNSELECTED_BACKGROUND = "transparent";

const typeToTitle = (type: string) => {
    switch (type) {
        case 'titles':
            return "Titles";
        case 'paragraphs':
            return "Paragraphs";
        case 'data':
            return "Data";
        case 'lines':
            return 'Lines';
        case 'shapes':
            return 'Shapes';
        case 'arrows':
            return 'Arrows';
        case 'switcher':
            return 'Switcher';
        case 'banner':
            return 'Banner';
    }
}

export function SecondColumnOption(props: any) {
    const selectedSecondType = useSelector((state: RootState) => state.leftMenu.selectedSecondType);
    const dispatch = useDispatch();

    const onSelect = () => {
        dispatch(setSelectedSecondType(props.type));
        if(props.disableScroll !== true) {
            scroller.scrollTo(props.type, {
                duration: 1500,
                delay: 80,
                smooth: true,
                containerId: 'third-column-content',
            });
        }
    }

    return <span 
        className="second-column-option" 
        style={{background: selectedSecondType === props.type ? SELECT_BACKGROUND : UNSELECTED_BACKGROUND}}
        onClick={onSelect}
    >
        {typeToTitle(props.type)}
    </span> 
}