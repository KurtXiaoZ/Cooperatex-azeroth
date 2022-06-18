import { MenuSetterStyle } from 'components/canvas/specificComponents/menu/MenuSetterStyle';
import { Edit } from 'components/canvas/specificComponents/textTitles/TextTitlesIcons/setters/edit';
import { useDispatch, useSelector } from 'react-redux';
import { setSetterType } from 'redux/canvasReducer';
import { RootState } from 'redux/store';
import './index.less';
import CloseIcon from './closeIcon.svg';
import { TextSetterEdit } from 'components/canvas/specificComponents/text/TextSetterEdit';
import { TextSetterStyle } from 'components/canvas/specificComponents/text/TextSetterStyle';
import { setComponentStyle } from 'redux/pagesReducer';
import { LineSetter } from 'components/canvas/specificComponents/decorative/line/LineSetter';
import { ShapeStyleSetter } from 'components/canvas/specificComponents/decorative/shape/ShapeStyleSetter';
import { LinkSetter } from 'components/canvas/specificComponents/common/LinkSetter';
import { ArrowSetterStyle } from 'components/canvas/specificComponents/decorative/arrow/ArrowSetterStyle';
import { ImageSetterStyle } from 'components/canvas/specificComponents/image/custom/ImageSetterStyle';
import { SwitcherSetterManage } from 'components/canvas/specificComponents/interactive/SwitcherSetterManage';
import { SwitcherSetterStyle } from 'components/canvas/specificComponents/interactive/SwitcherSetterStyle';
import { IRSetterStyle } from 'components/canvas/specificComponents/ir/IRSetterStyle';
import { IRSetterText } from 'components/canvas/specificComponents/ir/IR/IRSetterText';

export function Setter(props: any) {
    const setterType = useSelector((state: RootState) => state.canvas.setterType);

    const renderSetter = () => {
        switch (setterType) {
            case 'text_title':
                return <Edit />;
            case 'menu':
                return <MenuSetterStyle />;
            case 'textEdit':
                return <TextSetterEdit />;
            case 'textStyle':
                return <TextSetterStyle />;
            case 'line':
                return <LineSetter key={setterType}/>;
            case 'shape':
                return <ShapeStyleSetter />
            case 'link':
                return <LinkSetter />
            case 'arrowStyle':
                return <ArrowSetterStyle />;
            case 'imageStyle':
                return <ImageSetterStyle />;
            case 'switcherManage':
                return <SwitcherSetterManage />;
            case 'switcherStyle':
                return <SwitcherSetterStyle />;
            case 'irStyle':
                return <IRSetterStyle />;
            case 'irText':
                return <IRSetterText />;
            case '':
                return <div style={{display: 'none'}}></div>
        }
    }

    return <div className='canvas-component-setter-container' style={{display: setterType === "" ? 'none' : 'block'}}>
        {renderSetter()}
    </div>
}

export function SetterHeader(props: any) {
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(setSetterType(""));
    }
    return <div className='menu-setter-header'>
        <span className='menu-setter-header-title'>{props.title}</span>
        <img className='menu-setter-header-close' src={CloseIcon} onClick={onClose}/>
    </div>
}

export function SetterFooter(props: any) {
    return <div className='menu-setter-footer'>
        <div className='menu-setter-footer-button' onClick={props.action}>Done</div>
    </div>
}