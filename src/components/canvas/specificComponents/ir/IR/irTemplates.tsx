export const UnmergedClick = (x: any, y: any, ruleId: any, chosenRuleIds: any, ruleIdsToNames: any,) => {
    return {
        type: 'unmergedClick',
        x: x - 50,
        y: y,
        buttonX: 0,
        buttonY: 0,
        style: {
            width: '100px',
            height: '28px',
            buttonStyle: 'button1',
            buttonWidth: '100px',
            buttonHeight: '28px',
            buttonFontSize: 0.5,
        },
        ruleId: ruleId,
        chosenRuleIds: chosenRuleIds,
        ruleIdsToNames: ruleIdsToNames,
        buttonText: "Button"
    }
}

export const unmergedNonclick = (x: any, y: any, ruleId: any, chosenRuleIds: any, ruleIdsToNames: any,) => {
    return {
        type: 'unmergedNonclick',
        x: x - 114,
        y: y,
        buttonX: 148,
        buttonY: 0,
        inputX: 0,
        inputY: 0,
        style: {
            width: '228px',
            height: '28px',
            buttonFontSize: 0.5,
            buttonWidth: '80px',
            buttonHeight: '28px',
            buttonStyle: 'button1',
            inputWidth: '140px',
            inputHeight: '28px',
            inputStyle: 'input1',
        },
        ruleId: ruleId,
        chosenRuleIds: chosenRuleIds,
        ruleIdsToNames: ruleIdsToNames,
        buttonText: "Button"
    }
}

export const mergedClick = (x: any, y: any, ruleId: any, chosenRuleIds: any, ruleIdsToNames: any,) => {
    return {
        type: 'mergedClick',
        x: x - 114,
        y: y,
        buttonX: 148,
        buttonY: 0,
        selectorX: 0,
        selectorY: 0,
        style: {
            width: '228px',
            height: '28px',
            buttonFontSize: 0.5,
            buttonWidth: '80px',
            buttonHeight: '28px',
            buttonStyle: 'button1',
            selectorWidth: '140px',
            selectorHeight: '28px',
            selectorFontColor: '#000000B2',
            selectorStyle: 'selector1',
        },
        ruleId: ruleId,
        chosenRuleIds: chosenRuleIds,
        ruleIdsToNames: ruleIdsToNames,
        buttonText: "Button"
    }
}

export const mergedNonclick = (x: any, y: any, ruleId: any, chosenRuleIds: any, ruleIdsToNames: any,) => {
    return {
        type: 'mergedNonclick',
        x: x - 114,
        y: y,
        buttonX: 148,
        buttonY: 44,
        selectorX: 0,
        selectorY: 0,
        inputX: 0,
        inputY: 44,
        style: {
            width: '228px',
            height: '72px',
            buttonFontSize: 0.5,
            buttonWidth: '80px',
            buttonHeight: '28px',
            buttonStyle: 'button1',
            selectorWidth: '140px',
            selectorHeight: '28px',
            selectorFontColor: '#000000B2',
            selectorStyle: 'selector1',
            inputWidth: '140px',
            inputHeight: '28px',
            inputStyle: 'input1',
        },
        ruleId: ruleId,
        chosenRuleIds: chosenRuleIds,
        ruleIdsToNames: ruleIdsToNames,
        buttonText: "Button"
    }
}