import { useState } from "react";
import Triangle from '../../icons/triangle.svg';
import './index.less';

export function IRSelector(props: any) {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState("");

    const typeToHeaderClassName = () => {
        switch(props.source.style.selectorStyle) {
            case 'selector1': return 'ir-selector-1-header';
            case 'selector2': return 'ir-selector-2-header';
            default: return 'ir-selector-1-header';
        }
    }

    const typeToContentClassName = () => {
        switch(props.source.style.selectorStyle) {
            case 'selector1': return 'ir-selector-1-content';
            case 'selector2': return 'ir-selector-2-content';
            default: return 'ir-selector-1-content';
        }
    }

    const typeToTriangleClassName = () => {
        switch(props.source.style.selectorStyle) {
            case 'selector1': return 'ir-selector-1-triangle';
            case 'selector2': return 'ir-selector-2-triangle';
            default: return 'ir-selector-1-triangle';
        }
    }

    return <div>
        <div className={`option-selector ${typeToHeaderClassName()}`}
            style={{
                position: 'relative',
                display: 'flex',
                left: '0px',
                top: '0px',
                height: props.source.style.selectorHeight,
                width: props.source.style.selectorWidth,
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    left: '15px',
                    top: '0px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: props.source.style.selectorHeight,
                    //color: props.source.style.selectorFontColor,
                    width: parseInt(props.source.style.selectorWidth) * 0.55 + 'px',
                }}
            >{props.source.ruleIdsToNames[selectedRuleId]}</span>
            <div
                style={{
                    position: 'absolute',
                    right: '0px',
                    top: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: props.source.style.selectorHeight,
                    width: props.source.style.selectorHeight,
                }}
                className={typeToTriangleClassName()}
            >
                <img src={Triangle} onClick={() => setShowOptions(!showOptions)}/>
            </div>
        </div>
        <div
            style={{
                position: 'absolute',
                left: '0px',
                top: props.source.style.selectorHeight,
                height: 'fit-content',
                width: props.source.style.selectorWidth,
                paddingLeft: '15px',
                display: showOptions ? 'block' : 'none',
            }}
            className={typeToContentClassName()}
        >
            {props.source.chosenRuleIds.map((ruleId: string) => {
                return <div
                    style={{
                        height: '20px',
                        lineHeight: '20px',
                        textAlign: 'left',
                    }}
                    onClick={() => setSelectedRuleId(ruleId)}
                >
                    {props.source.ruleIdsToNames[ruleId]}
                </div>
            })}
        </div>
    </div>
}