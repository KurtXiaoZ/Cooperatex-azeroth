import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMainType, setSelectedSecondType } from 'redux/leftMenuReducer';
import { RootState } from 'redux/store';
import './index.less';

const SELECT_BACKGROUND = "rgba(255, 255, 255, 0.1)";
const UNSELECTED_BACKGROUND = "transparent";

const typeToTitle = (type: string) => {
    switch (type) {
        case 'ir':
            return "IR";
        case 'image':
            return "Image";
        case 'text':
            return "Text";
        case 'decorative':
            return "Decorative";
        case 'interactive':
            return "Interactive";
        case 'social':
            return "Social";
        default: 
            return "";
    }
}

export function MajorColumnOption(props: any) {
    const selectedType = useSelector((state: RootState) => state.leftMenu.selectedMainType);
    const dispatch = useDispatch();

    const selectType = () => {
        dispatch(setSelectedMainType(props.type));
        if(props.type === 'ir') dispatch(setSelectedSecondType("ir"));
        else if(props.type === 'text') dispatch(setSelectedSecondType("titles"));
        else if(props.type === 'image') dispatch(setSelectedSecondType("image"));
        else if(props.type === 'decorative') dispatch(setSelectedSecondType("lines"));
        else if(props.type === 'interactive') dispatch(setSelectedSecondType("switcher"));
    }

    return <span 
        className="major-column-option" 
        onClick={selectType} 
        style={{background: selectedType === props.type ? SELECT_BACKGROUND : UNSELECTED_BACKGROUND}}
    >
        {typeToTitle(props.type)}
    </span>
}