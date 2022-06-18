import './index.less';
import * as Scroll from 'react-scroll';
import { OptionWrapper } from 'components/LeftMenu/OptionWrapper';
import ThinLine from './icons/thinLine.svg';
import ThickLine from './icons/thickLine.svg';
import DashLine from './icons/dashLine.svg';
import DotLine from './icons/dotLine.svg';
import ThinArrow from './icons/thinArrow.svg';
import ThickArrow from './icons/thickArrow.svg';
import Circle from './icons/circle.svg';
import Rect from './icons/rect.svg';
import RoundRect from './icons/roundRect.svg';
import RoundSquare from './icons/roundSquare.svg';
import Square from './icons/square.svg';
import Pentagon from './icons/pentagon.svg';
import Triangle from './icons/triangle.svg';
import Parallelogram from './icons/parallelogram.svg';
import Star from './icons/star.svg';
import Diamond from './icons/diamond.svg';
import Heart from './icons/heart.svg';
import Trapezoid from './icons/trapezoid.svg';
import ArrowR1C1 from './icons/arrow-r1-c1.svg';
import ArrowR1C2 from './icons/arrow-r1-c2.svg';
import ArrowR1C3 from './icons/arrow-r1-c3.svg';
import ArrowR2C1 from './icons/arrow-r2-c1.svg';
import ArrowR2C2 from './icons/arrow-r2-c2.svg';
import ArrowR2C3 from './icons/arrow-r2-c3.svg';
import ArrowR3C1 from './icons/arrow-r3-c1.svg';
import ArrowR3C2 from './icons/arrow-r3-c2.svg';
import ArrowR3C3 from './icons/arrow-r3-c3.svg';
import ArrowR3C4 from './icons/arrow-r3-c4.svg';
import ArrowR3C5 from './icons/arrow-r3-c5.svg';
import ArrowR4C1 from './icons/arrow-r4-c1.svg';
import ArrowR4C2 from './icons/arrow-r4-c2.svg';
import ArrowR4C3 from './icons/arrow-r4-c3.svg';
import ArrowR4C4 from './icons/arrow-r4-c4.svg';
import ArrowR4C5 from './icons/arrow-r4-c5.svg';

const Element = Scroll.Element;

export function ThirdColumnDecorative(props: any) {
    return <>
        <Element name="lines"><span className='third-column-decorative-title'>Lines</span></Element>
        <OptionWrapper source={Line1} children={<img src={ThinLine} className='third-column-decorative-line'/>}/>
        <OptionWrapper source={Line2} children={<img src={ThickLine} className='third-column-decorative-line'/>}/>
        <OptionWrapper source={Line3} children={<img src={DashLine} className='third-column-decorative-line'/>}/>
        <OptionWrapper source={Line4} children={<img src={DotLine} className='third-column-decorative-line'/>}/>
        <OptionWrapper source={Line5} children={<img src={ThinArrow} className='third-column-decorative-line-arrow'/>}/>
        <OptionWrapper source={Line6} children={<img src={ThickArrow} className='third-column-decorative-line-arrow'/>}/>
        <Element name="shapes"><span className='third-column-decorative-title third-column-decorative-margin-title'>Shapes</span></Element>
        <div className='third-column-decorative-shape-container'>
            <OptionWrapper source={CircleSource} children={<img src={Circle} className='third-column-decorative-circle'/>}/>
            <div className='third-column-decorative-shape-sub-container'>
                <OptionWrapper source={RectSource} children={<img src={Rect} className='third-column-decorative-rect'/>}/>
                <OptionWrapper source={RoundRectSource} children={<img src={RoundRect} className='third-column-decorative-round-rect'/>}/>
            </div>
            <OptionWrapper children={<img src={RoundSquare} className='third-column-decorative-square'/>}/>
        </div>
        <div className='third-column-decorative-shape-container'>
            <OptionWrapper children={<img src={Square} className='third-column-decorative-square'/>}/>
            <OptionWrapper children={<img src={Pentagon} className='third-column-decorative-pentagon'/>}/>
            <OptionWrapper children={<img src={Triangle} className='third-column-decorative-triangle'/>}/>
        </div>
        <div className='third-column-decorative-shape-container'>
            <OptionWrapper children={<img src={Parallelogram} className='third-column-decorative-parallelogram'/>}/>
            <OptionWrapper children={<img src={Star} className='third-column-decorative-star'/>}/>
            <OptionWrapper children={<img src={Diamond} className='third-column-decorative-diamond'/>}/>
            <OptionWrapper children={<img src={Heart} className='third-column-decorative-heart'/>}/>
            <OptionWrapper children={<img src={Trapezoid} className='third-column-decorative-trapezoid'/>}/>
        </div>
        <Element name="arrows"><span className='third-column-decorative-title third-column-decorative-margin-title'>Arrows</span></Element>
        <div className='third-column-decorative-arrow-container'>
            <OptionWrapper source={arrowR1C1} children={<img src={ArrowR1C1} className='third-column-decorative-arrow-r1-c1'/>}/>
            <OptionWrapper children={<img src={ArrowR1C2} className='third-column-decorative-arrow-r1-c2'/>}/>
            <OptionWrapper children={<img src={ArrowR1C3} className='third-column-decorative-arrow-r1-c3'/>}/>
        </div>
        <div className='third-column-decorative-arrow-container'>
            <OptionWrapper children={<img src={ArrowR2C1} className='third-column-decorative-arrow-r2-c1'/>}/>
            <OptionWrapper children={<img src={ArrowR2C2} className='third-column-decorative-arrow-r2-c2'/>}/>
            <OptionWrapper children={<img src={ArrowR2C3} className='third-column-decorative-arrow-r2-c3'/>}/>
        </div>
        <div className='third-column-decorative-arrow-container'>
            <OptionWrapper children={<img src={ArrowR3C1} className='third-column-decorative-arrow-r3-c1'/>}/>
            <OptionWrapper children={<img src={ArrowR3C2} className='third-column-decorative-arrow-r3-c2'/>}/>
            <OptionWrapper children={<img src={ArrowR3C3} className='third-column-decorative-arrow-r3-c3'/>}/>
            <OptionWrapper children={<img src={ArrowR3C4} className='third-column-decorative-arrow-r3-c4'/>}/>
            <OptionWrapper children={<img src={ArrowR3C5} className='third-column-decorative-arrow-r3-c5'/>}/>
        </div>
        <div className='third-column-decorative-arrow-container'>
            <OptionWrapper children={<img src={ArrowR4C1} className='third-column-decorative-arrow-r4-c1'/>}/>
            <OptionWrapper children={<img src={ArrowR4C2} className='third-column-decorative-arrow-r4-c2'/>}/>
            <OptionWrapper children={<img src={ArrowR4C3} className='third-column-decorative-arrow-r4-c3'/>}/>
            <OptionWrapper children={<img src={ArrowR4C4} className='third-column-decorative-arrow-r4-c4'/>}/>
            <OptionWrapper children={<img src={ArrowR4C5} className='third-column-decorative-arrow-r4-c5'/>}/>
        </div>
        <div className='third-column-decorative-place-holder'></div>
    </>
}

const Line1 = {
    type: 'line',
    style: {
        width: 230,
        height: 20,
        backgroundColor: '#4D4D4D',
        opacity: 1,
    }
}

const Line2 = {
    type: 'line',
    style: {
        width: 230,
        height: 20,
        backgroundColor: '#4D4D4D',
        opacity: 1,
    }
}

const Line3 ={
    type: 'dashLine',
    style: {
        width: 230,
        height: 20,
        backgroundColor: '#4D4D4D',
        opacity: 1,
    }
}

const Line4 ={
    type: 'dotLine',
    style: {
        width: 230,
        height: 20,
        backgroundColor: '#4D4D4D',
        opacity: 1,
    }
}

const Line5 = {
    type: 'arrowLine1',
    style: {
        width: 230,
        height: 20,
        backgroundColor: '#4D4D4D',
        opacity: 1,
    }
}

const Line6 = {
    type: 'arrowLine2',
    style: {
        width: 230,
        height: 20,
        backgroundColor: '#4D4D4D',
        opacity: 1,
    }
}

const CircleSource = {
    type: 'circle',
    style: {
        width: 68,
        height: 68,
        fillColor: '#4D4D4D',
        fillOpacity: 1,
        strokeOpacity: 1,
        zIndex: 3,
    }
}

const RectSource = {
    type: 'rect',
    style: {
        width: 136,
        height: 68,
        fillColor: '#4D4D4D',
        fillOpacity: 1,
        strokeOpacity: 1,
    }
}

const RoundRectSource = {
    type: 'roundRect',
    style: {
        width: 136,
        height: 68,
        fillColor: '#4D4D4D',
        fillOpacity: 1,
        strokeOpacity: 1,
    }
}

const arrowR1C1 = {
    type: 'arrowR1C1',
    style: {
        width: 230,
        height: 40,
        fillColor: '#4D4D4D',
        opacity: 1,
    }
}
