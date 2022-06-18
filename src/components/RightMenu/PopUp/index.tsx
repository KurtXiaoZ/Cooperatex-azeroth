import ReactDOM from 'react-dom';
import './index.less';
import WarnIcon from './warnIcon.svg';


export function PopUp(props: any) {
    return <>
        {props.display && ReactDOM.createPortal(<div
            style={{display: props.display ? 'block' : 'none'}}
            className='warning-block' 
        ></div>,
            document.getElementsByTagName('body')[0]
        )}
        <div className='warning' style={{display: props.display ? "block" : "none"}}>
            <div className='warning-header'>
                <img className='warning-header-icon' src={WarnIcon}/>
                <span className='warning-header-title'>Warning</span>
            </div>
            <div className='warning-text'>
                <div className='warning-text-content'>{props.text}</div>
            </div>
            <div className='warning-footer'>
                <span className='warning-footer-done' onClick={props.onConfirm}>Done</span>
                <span className='warning-footer-cancel' onClick={props.onCancel}>Cancel</span>
            </div>
        </div>
    </>
}