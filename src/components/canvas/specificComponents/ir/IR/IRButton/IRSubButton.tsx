import './index.less';

export function IRSubButton(props: any) {
    const typeToClassName = () => {
        switch(props.source.style.buttonStyle) {
            case 'button1': return 'ir-component-button-1';
            case 'button2': return 'ir-component-button-2';
            case 'button3': return 'ir-component-button-3';
            case 'button4': return 'ir-component-button-4';
            case 'button5': return 'ir-component-button-5';
            case 'button6': return 'ir-component-button-6';
            default: return 'ir-component-button-1';
        }
    }
    return <div 
        style={{
            height: props.source.style.buttonHeight,
            width: props.source.style.buttonWidth,
            lineHeight: props.source.style.buttonHeight,
            fontSize: parseInt(props.source.style.buttonHeight) * props.source.style.buttonFontSize + 'px',
            textAlign: 'center',
            padding: '0px 10px',
            overflow: 'hidden',
        }}
        className={typeToClassName()}
    >
        {props.source.buttonText}
    </div>
}