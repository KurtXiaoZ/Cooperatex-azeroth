import './index.less';
import * as Scroll from 'react-scroll';
import { OptionWrapper } from 'components/LeftMenu/OptionWrapper';

const Element = Scroll.Element;

export function ThirdColumnText(props: any) {
    return <>
        <Element name="titles"><span className='third-column-text-title'>Titles</span></Element>
        <OptionWrapper source={{type:"text", text:"Big Bold Title", style:BIG_BOLD_TITLE}} children={<span className='third-column-text-big-bold-title third-column-text-option'>Big Bold Title</span>} />
        <OptionWrapper source={{type:"text", text:"Medium Bold Title", style:MEDIUM_BOLD_TITLE}} children={<span className='third-column-text-medium-bold-title third-column-text-option'>Medium Bold Title</span>} />
        <OptionWrapper source={{type:"text", text:"Small Bold Title", style:SMALL_BOLD_TITLE}} children={<span className='third-column-text-small-bold-title third-column-text-option'>Small Bold Title</span>} />
        <OptionWrapper source={{type:"text", text:"Small Regular Title", style:SMALL_REGULAR_TITLE}} children={<span className='third-column-text-small-regular-title third-column-text-option'>Small Regular Title</span>} />
        <Element name="paragraphs"><span className='third-column-text-title third-column-paragraphs'>Paragraphs</span></Element>
        <OptionWrapper source={{type:"text", text:DEFAULT_PARAGRAPH, style:PARAGRAPH_1}} children={<span className='third-column-text-paragraph-1 third-column-text-option'>This text is just an example, please edit the content of the paragraph text</span>} />
        <OptionWrapper  source={{type:"text", text:DEFAULT_PARAGRAPH, style:PARAGRAPH_2}} children={<span className='third-column-text-paragraph-2 third-column-text-option'>This text is just an example, please edit the content of the paragraph text</span>} />
        <OptionWrapper  source={{type:"text", text:DEFAULT_PARAGRAPH, style:PARAGRAPH_3}} children={<span className='third-column-text-paragraph-3 third-column-text-option'>This text is just an example, please edit the content of the paragraph text</span>} />
        <OptionWrapper  source={{type:"text", text:DEFAULT_PARAGRAPH, style:PARAGRAPH_4}} children={<span className='third-column-text-paragraph-4 third-column-text-option'>This text is just an example, please edit the content of the paragraph text</span>} />
        <OptionWrapper  source={{type:"text", text:DEFAULT_PARAGRAPH, style:PARAGRAPH_5}} children={<span className='third-column-text-paragraph-5 third-column-text-option'>This text is just an example, please edit the content of the paragraph text</span>} />
        <div className='third-column-text-place-holder'></div>
    </>
}

const DEFAULT_PARAGRAPH = "This text is just an example, please edit the content of the paragraph text";

const BIG_BOLD_TITLE = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '32px',
    fontWeight: '700',
    color: '#4D4D4D',
    width: '223px',
    height: '56px',
    opacity: 1,
}

const MEDIUM_BOLD_TITLE = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '24px',
    fontWeight: '700',
    color: '#4D4D4D',
    width: '193px',
    height: '36px',
    opacity: 1,
}

const SMALL_BOLD_TITLE = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: '700',
    color: '#4D4D4D',
    width: '233px',
    height: '36px',
    opacity: 1,
}

const SMALL_REGULAR_TITLE = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: '400',
    color: '#4D4D4D',
    width: '193px',
    height: '36px',
    opacity: 1,
}

const PARAGRAPH_1 = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: '500',
    color: '#4D4D4D',
    width: '214px',
    opacity: 1,
}

const PARAGRAPH_2 = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: '400',
    color: '#4D4D4D',
    width: '214px',
    opacity: 1,
}

const PARAGRAPH_3 = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: '300',
    color: '#4D4D4D',
    width: '214px',
    opacity: 1,
}

const PARAGRAPH_4 = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: '400',
    color: '#4D4D4D',
    width: '214px',
    opacity: 1,
}

const PARAGRAPH_5 = {
    display: 'block',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: '300',
    color: '#4D4D4D',
    width: '214px',
    opacity: 1,
}