import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMainType, setSelectedSecondType } from 'redux/leftMenuReducer';
import { RootState } from 'redux/store';
import { ThirdColumnText } from '../ThirdColumnText';
import CloseIcon from './closeIcon.svg';
import './index.less';
import { ThirdColumnImage } from '../ThirdColumnImage';
import { ThirdColumnDecorative } from '../ThirdColumnDecorative';
import { ThirdColumnInteractive } from '../ThirdColumnInteractive';

const renderContent = (mainType: string, secondType: string) => {
    if(mainType === 'text') {
        return <ThirdColumnText />
    }
    else if(mainType === 'image') {
        return <ThirdColumnImage />
    }
    else if(mainType === 'decorative') {
        return <ThirdColumnDecorative />
    }
    else if(mainType === 'interactive') {
        return <ThirdColumnInteractive />
    }
    return <></>
}

export function ThirdColumn(props: any) {
    const selectedMainType = useSelector((state: RootState) => state.leftMenu.selectedMainType);
    const selectedSecondType = useSelector((state: RootState) => state.leftMenu.selectedSecondType);
    const dispatch = useDispatch();

    const onClose = () => {
        if(selectedMainType === 'text') {
            dispatch(setSelectedMainType(""));
            dispatch(setSelectedSecondType(""));
        }
        else if(selectedMainType === 'image') {
            dispatch(setSelectedMainType(""));
            dispatch(setSelectedSecondType(""));
        }
        else if(selectedMainType === "decorative") {
            dispatch(setSelectedMainType(""));
            dispatch(setSelectedSecondType(""));
        }
        else if(selectedMainType === "interactive") {
            dispatch(setSelectedMainType(""));
            dispatch(setSelectedSecondType(""));
        }
        else if(selectedMainType === "ir") {
            dispatch(setSelectedMainType(""));
            dispatch(setSelectedSecondType(""));
        }
    }
    
    return <div className='third-column' style={{
        //width: selectedSecondType !== '' ? "0" : "auto",
        display: selectedSecondType !== '' ? "block" : "none"
    }}>
    <div className='third-column-empty-top' style={{
        //width: selectedSecondType !== '' ? "0" : "100%",
    }}>
        <img className='third-column-close' onClick={onClose} src={CloseIcon} />
    </div>
    <div className='third-column-content' id='third-column-content' style={{
        //display: selectedSecondType !== '' ? "block" : "none"
    }}>
        {renderContent(selectedMainType, selectedSecondType)}
    </div>
</div>
}

//style={{display: selectedSecondType !== '' ? "block" : "none"}}