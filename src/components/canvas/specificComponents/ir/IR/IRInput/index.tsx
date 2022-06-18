import './index.less';

export function IRInput(props: any) {
    const typeToClassName = () => {
        switch(props.source.style.inputStyle) {
            case 'input1': return 'ir-component-input-1';
            case 'input2': return 'ir-component-input-2';
            case 'input3': return 'ir-component-input-3';
            default: return 'ir-component-input-1';
        }
    }
    return <input 
        style={{
            width: props.source.style.inputWidth,
            height: props.source.style.inputHeight,
        }}
        className={typeToClassName()}
    />
}