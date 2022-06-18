import './index.less';
import * as Scroll from 'react-scroll';
import { OptionWrapper } from 'components/LeftMenu/OptionWrapper';
import Switcher1 from './icons/switcher-1.svg';
import Switcher2 from './icons/switcher-2.svg';
import Banner1 from './icons/banner-1.svg';
import Banner2 from './icons/banner-2.svg';
import Banner3 from './icons/banner-3.svg';


const Element = Scroll.Element;

export function ThirdColumnInteractive(props: any) {
    return <>
        <Element name="switcher"><span className='third-column-interactive-title'>Switcher</span></Element>
        <OptionWrapper source={SwitcherSource1} children={<img src={Switcher1} className='third-column-interactive-switcher-1 third-column-interactive-option'/>}/>
        <OptionWrapper children={<img src={Switcher2} className='third-column-interactive-switcher-2 third-column-interactive-option'/>}/>
        <Element name="banner"><span className='third-column-interactive-title third-column-paragraphs'>Banner</span></Element>
        <OptionWrapper children={<img src={Banner1} className='third-column-interactive-banner-1 third-column-interactive-option'/>}/>
        <OptionWrapper children={<img src={Banner2} className='third-column-interactive-banner-2 third-column-interactive-option'/>}/>
        <OptionWrapper children={<img src={Banner3} className='third-column-interactive-banner-3 third-column-interactive-option'/>}/>

        <div className='third-column-text-place-holder'></div>
    </>
}

const SwitcherSource1 = {
    type: 'switcher1',
    style: {
        width: '414px',
        height: '240px',
        defaultColor: '#A6A6A6',
        chosenColor: '#C698DC',
        font: 'Roboto',
        fontSize: 24,
        zIndex: 1
    },
    tabs: {
        ["Label1"]: [],
        ["Label2"]: [],
        ["Label3"]: [],
    },
    tabOrder: ['Label1', 'Label2', 'Label3'],
    selectedTab: "Label1",
    fixed: false,
}