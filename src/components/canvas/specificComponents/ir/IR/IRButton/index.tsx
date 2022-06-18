import './index.less';

export function IRButton(props: any) {
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
            height: props.source.style.height,
            lineHeight: props.source.style.height,
            width: props.source.style.width,
            fontSize: parseInt(props.source.style.buttonHeight) * props.source.style.buttonFontSize + 'px',
        }}
        className={typeToClassName()}
    >
        {props.source.buttonText}
    </div>
}