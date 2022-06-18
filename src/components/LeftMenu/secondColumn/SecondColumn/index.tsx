import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMainType, setSelectedSecondType } from 'redux/leftMenuReducer';
import { RootState } from 'redux/store';
import { SecondColumnDecorative } from '../SecondColumnDecorative';
import { SecondColumnInteractive } from '../SecondColumnInteractive';
import { SecondColumnText } from '../SecondColumnText';
import { SubColumnIRSystems } from '../subColumnIR/SubColumnIRSystems';
import CloseIcon from './closeIcon.svg';
import './index.less';


const mainTypeToContent = (type: string) => {
    switch (type) {
        case 'ir':
            return <SubColumnIRSystems />;
        case 'text':
            return <SecondColumnText />;
        case 'decorative':
            return <SecondColumnDecorative />;
        case 'interactive':
            return <SecondColumnInteractive />;
        default: 
            return <></>;
    }
}

export function SecondColumn(props: any) {
    const selectedMainType = useSelector((state: RootState) => state.leftMenu.selectedMainType);
    const selectedSecondType = useSelector((state: RootState) => state.leftMenu.selectedSecondType);
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setSelectedMainType(""));
        dispatch(setSelectedSecondType(""));
    }

    return <div className='sub-column'>
        <div className='sub-column-empty-top' style={{display: selectedMainType !== '' ? "block" : "none"}}>
            <img className='sub-column-close' style={{display: selectedSecondType === '' ? "block" : "none"}} onClick={onClose} src={CloseIcon} />
        </div>
        <div className='sub-column-content' style={{display: selectedMainType !== '' ? "block" : "none"}}>
            {mainTypeToContent(selectedMainType)}
        </div>
    </div>
}
