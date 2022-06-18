import './index.less';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setComponentHeight } from 'redux/pagesReducer';
import Triangle from '../icons/triangle.svg';

export function IR(props: any) {
    const dispatch = useDispatch();
    const render = () => {
        if(props.source.chosenRuleIds.length === 1 && props.source.isClickButton) return <UnmergedClickIR pageKey={props.pageKey} componentKey={props.componentKey} source={props.source}/>
        else if(props.source.chosenRuleIds.length === 1 && !props.source.isClickButton) return <UnmergedNonclickIR pageKey={props.pageKey} componentKey={props.componentKey} source={props.source}/>
        else if(props.source.chosenRuleIds.length !== 1 && props.source.isClickButton) return <MergedClickIR pageKey={props.pageKey} componentKey={props.componentKey} source={props.source}/>
        else if(props.source.chosenRuleIds.length !== 1 && !props.source.isClickButton) return <MergedNonclickIR pageKey={props.pageKey} componentKey={props.componentKey} source={props.source}/>
        else return <></>
    }

    return render();
}

function UnmergedClickIR(props: any) {
    return <UnmergedClickIR pageKey={props.pageKey} componentKey={props.componentKey} source={props.source}/>
}

function UnmergedNonclickIR(props: any) {
    return <div style={{
            position: 'relative',
            height: props.source.style.height,
            width: props.source.style.width,
        }}
    >
        <input style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: parseInt(props.source.style.width) * props.source.style.inputWidth + 'px',
            height: props.source.style.height,
            borderRadius: '3px',
            border: props.source.style.inputBorder,
            fontSize: parseInt(props.source.style.width) * props.source.style.inputFontSize * props.source.style.inputWidth + 'px',
            color: 'black',
        }}/>
        <span style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '0px',
            right: '0px',
            height: props.source.style.height,
            width: parseInt(props.source.style.width) * props.source.style.buttonWidth + 'px',
            background: props.source.style.buttonBackgroundColor,
            border: props.source.style.buttonBorder,
            color: props.source.style.buttonColor,
            fontSize: parseInt(props.source.style.width) * props.source.style.buttonFontSize * props.source.style.buttonWith + 'px',
        }}
        >{props.source.buttonText}</span>
    </div>
}


function MergedClickIR(props: any) {
    const [selectedRuleId, setSelectedRuleId] = useState(props.source.ruleId);
    const [showOptions, setShowOptions] = useState(false);
    return <div style={{
            position: 'relative',
            height: props.source.style.height,
            width: props.source.style.width,
            fontFamily: 'Roboto',
        }}
    >
        <div>
            <div className='option-selector'
                style={{
                    position: 'relative',
                    display: 'flex',
                    left: '0px',
                    top: '0px',
                    height: props.source.style.height,
                    width: parseInt(props.source.style.width) * props.source.style.selectorWidth + 'px',
                    border: '1px solid #00000033',
                    borderRadius: '3px',
                }}
                onClick={() => setShowOptions(!showOptions)}
            >
                <span
                    style={{
                        position: 'absolute',
                        left: '15px',
                        top: '0px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: props.source.style.height,
                        width: parseInt(props.source.style.width) * props.source.style.selectorWidth * 0.55 + 'px',
                    }}
                >{props.source.ruleIdsToNames[selectedRuleId]}</span>
                <div
                    style={{
                        position: 'absolute',
                        right: '5px',
                        top: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: props.source.style.height,
                        width: props.source.style.height,
                    }}
                >
                    <img src={Triangle}/>
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: '0px',
                    top: props.source.style.height,
                    height: 'fit-content',
                    width: parseInt(props.source.style.width) * props.source.style.selectorWidth + 'px',
                    paddingLeft: '15px',
                    textAlign: 'left',
                    borderLeft: '1px solid #00000033',
                    borderRight: '1px solid #00000033',
                    borderBottom: '1px solid #00000033',
                    borderRadius: '3px',
                    display: showOptions ? 'block' : 'none',
                }}
            >
                {props.source.chosenRuleIds.map((ruleId: string) => {
                    return <div
                        style={{
                            height: '20px',
                            lineHeight: '20px',
                        }}
                        onClick={() => setSelectedRuleId(ruleId)}
                    >
                        {props.source.ruleIdsToNames[ruleId]}
                    </div>
                })}
            </div>
        </div>
        <span style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '0px',
            right: '0px',
            height: props.source.style.height,
            width: parseInt(props.source.style.width) * props.source.style.buttonWidth + 'px',
            background: props.source.style.buttonBackgroundColor,
            border: props.source.style.buttonBorder,
            color: props.source.style.buttonColor,
            fontSize: parseInt(props.source.style.width) * props.source.style.buttonFontSize * props.source.style.buttonWith + 'px',
        }}
        >{props.source.buttonText}</span>
    </div>
}

function MergedNonclickIR(props: any) {
    const [selectedRuleId, setSelectedRuleId] = useState(props.source.ruleId);
    const [showOptions, setShowOptions] = useState(false);
    return <div style={{
            position: 'relative',
            height: props.source.style.height,
            width: props.source.style.width,
            fontFamily: 'Roboto',
        }}
    >
        <div>
            <div className='option-selector'
                style={{
                    position: 'relative',
                    display: 'flex',
                    left: '0px',
                    top: '0px',
                    height: parseInt(props.source.style.height) * 0.45 + 'px',
                    width: parseInt(props.source.style.width) * props.source.style.selectorWidth + 'px',
                    border: '1px solid #00000033',
                    borderRadius: '3px',
                }}
                onClick={() => setShowOptions(!showOptions)}
            >
                <span
                    style={{
                        position: 'absolute',
                        left: '15px',
                        top: '0px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: parseInt(props.source.style.height) * 0.45 + 'px',
                        width: parseInt(props.source.style.width) * props.source.style.selectorWidth * 0.55 + 'px',
                    }}
                >{props.source.ruleIdsToNames[selectedRuleId]}</span>
                <div
                    style={{
                        position: 'absolute',
                        right: '5px',
                        top: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: parseInt(props.source.style.height) * 0.45 + 'px',
                        width: parseInt(props.source.style.height) * 0.45 + 'px',
                    }}
                >
                    <img src={Triangle}/>
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: '0px',
                    top: parseInt(props.source.style.height) * 0.45 + 'px',
                    zIndex: 200,
                    background: 'white',
                    height: 'fit-content',
                    width: parseInt(props.source.style.width) * props.source.style.selectorWidth + 'px',
                    paddingLeft: '15px',
                    textAlign: 'left',
                    borderLeft: '1px solid #00000033',
                    borderRight: '1px solid #00000033',
                    borderBottom: '1px solid #00000033',
                    borderRadius: '3px',
                    display: showOptions ? 'block' : 'none',
                }}
            >
                {props.source.chosenRuleIds.map((ruleId: string) => {
                    return <div
                        style={{
                            height: '20px',
                            lineHeight: '20px',
                        }}
                        onClick={() => setSelectedRuleId(ruleId)}
                    >
                        {props.source.ruleIdsToNames[ruleId]}
                    </div>
                })}
            </div>
        </div>
        <input style={{
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: parseInt(props.source.style.width) * props.source.style.inputWidth + 'px',
            height: parseInt(props.source.style.height) * 0.45 + 'px',
            borderRadius: '3px',
            border: props.source.style.inputBorder,
            fontSize: parseInt(props.source.style.width) * props.source.style.inputFontSize * props.source.style.inputWidth + 'px',
            color: 'black',
        }}/>
        <span style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            height: parseInt(props.source.style.height) * 0.45 + 'px',
            width: parseInt(props.source.style.width) * props.source.style.buttonWidth + 'px',
            background: props.source.style.buttonBackgroundColor,
            border: props.source.style.buttonBorder,
            borderRadius: '5px',
            color: props.source.style.buttonColor,
            fontSize: parseInt(props.source.style.width) * props.source.style.buttonFontSize * props.source.style.buttonWith + 'px',
        }}
        >{props.source.buttonText}</span>
    </div>
}