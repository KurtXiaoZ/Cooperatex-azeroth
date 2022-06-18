import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import './index.less';


export function MenuOption(props: any) {
    const mainPageName = useSelector((state: RootState) => state.pages[props.pageKey].name);
    return <div className='menu-component-option' style={{
        backgroundColor: props.style.backgroundColor,
        color: props.style.color,
        borderBottom: props.style.borderBottom,
    }}>{mainPageName}</div>;
}