import { OptionWrapper } from 'components/LeftMenu/OptionWrapper';
import './index.less';


export function ThirdColumnImage(props: any) {
    return <>
        <OptionWrapper source={Custom} children={<span className="third-column-option-image">Custom</span>}/>
        <OptionWrapper children={<span className="third-column-option-image">Online</span>}/>
        <OptionWrapper children={<span className="third-column-option-image">Favorite</span>}/>
    </>
}

const Custom = {
    type: 'customImage',
    style: {
        width: 200,
        height: 200,
        opacity: 1,
    }
}