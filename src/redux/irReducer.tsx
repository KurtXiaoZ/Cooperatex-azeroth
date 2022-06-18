import { createSlice, PayloadAction } from '@reduxjs/toolkit';

function array_move(arr: any, old_index: number, new_index: number) {
    let cutOut = arr.splice(old_index, 1) [0]; // cut the element at index 'from'
    arr.splice(new_index, 0, cutOut);
};

export const canvasReducer = createSlice({
    name: 'ir',
    initialState: {
        systems: {},            // 所有IR系统
        selectedRuleId: "",     // 选中的IR规则的ID
        editSelectedRuleId: "", // 已选中的IR组件，重新编辑它的内部信息时，IR组件对应的规则ID
        x: 0,                   // IR组件的X值（用于拖拽）
        y: 0,                   // IR组件的Y值（用于拖拽）
        chosenRuleIds: [] as string[],      // 选中的IR规则，用于创建IR组件时的第二个窗口
        editChosenRuleIds: [] as string[],  // 重新编辑IR时的对应
        ruleIdsToNames: {},                 // 选中的IR规则和对应的选项名字，用于创建IR组件时的第三个窗口
        editRuleIdsToNames: {},             // 重新编辑IR时的对应
        editPageKey: "",                    // 重新编辑已生成的IR组件时，它所在的page的key
        editComponentKey: "",               // 重新编辑已生成的IR组件时，它自身的key
    },
    reducers: {
        setSystems: (state, action: PayloadAction<Array<object>>) => {
            let systems = action.payload;
            let newSystems = {};
            let firstSystemId = "";
            systems.forEach((system) => {
                if(firstSystemId === "") firstSystemId = system['systemId'];
                newSystems[system['systemId']] = system;
            });
            state.systems = newSystems;
        },
        incrementIRUsage: (state, action: PayloadAction<object>) => {
            state.systems[action.payload['systemId']]['ruleUsedTotal']++;
        },
        decrementIRUsage: (state, action: PayloadAction<object>) => {
            state.systems[action.payload['systemId']]['ruleUsedTotal']--;
        },
        setSelectedRuleId: (state, action: PayloadAction<object>) => {
            state.selectedRuleId = action.payload['ruleId'];
            state.x = action.payload['x'];
            state.y = action.payload['y'];
        },
        setEditRule: (state, action: PayloadAction<object>) => {
            console.log(action.payload['component']);
            state.editChosenRuleIds = action.payload['component']['chosenRuleIds'];
            state.editRuleIdsToNames = action.payload['component']['ruleIdsToNames'];
            state.editSelectedRuleId = action.payload['component']['ruleId'];
            state.editPageKey = action.payload['pageKey'];
            state.editComponentKey = action.payload['componentKey'];
        },
        addChosenRuleId: (state, action: PayloadAction<string>) => {
            if(state.chosenRuleIds.indexOf(action.payload) === -1) {
                state.chosenRuleIds.push(action.payload);
                state.ruleIdsToNames[action.payload] = "";
            }
        },
        addEditChosenRuleId: (state, action: PayloadAction<string>) => {
            if(state.editChosenRuleIds.indexOf(action.payload) === -1) {
                state.editChosenRuleIds.push(action.payload);
                state.editRuleIdsToNames[action.payload] = "";
            }
        },
        removeChosenRuleId: (state, action: PayloadAction<string>) => {
            if(state.chosenRuleIds.indexOf(action.payload) !== -1) {
                state.chosenRuleIds.splice(state.chosenRuleIds.indexOf(action.payload), 1);
                delete state.ruleIdsToNames[action.payload];
            }
        },
        editRemoveChosenRuleId: (state, action: PayloadAction<string>) => {
            if(state.editChosenRuleIds.indexOf(action.payload) !== -1) {
                state.editChosenRuleIds.splice(state.chosenRuleIds.indexOf(action.payload), 1);
                delete state.editRuleIdsToNames[action.payload];
            }
        },
        reorderChosenRuleIds: (state, action: PayloadAction<object>) => {
            array_move(state.chosenRuleIds, action.payload['oldIndex'], action.payload['newIndex']);
        },
        reorderEditChosenRuleIds: (state, action: PayloadAction<object>) => {
            array_move(state.editChosenRuleIds, action.payload['oldIndex'], action.payload['newIndex']);
        },
        clearChosenRuleIds: (state) => {
            state.chosenRuleIds = [];
        },
        clearEditChosenRuleIds: (state) => {
            state.editChosenRuleIds = [];
        },
        clearRulesToNames: (state) => {
            state.ruleIdsToNames = {};
        },
        clearEditRulesToNames: (state) => {
            state.editRuleIdsToNames = {};
        },
        setRuleIdName: (state, action: PayloadAction<object>) => {
            state.ruleIdsToNames[action.payload['ruleId']] = action.payload['name'];
        },
        editSetRuleIdName: (state, action: PayloadAction<object>) => {
            state.editRuleIdsToNames[action.payload['ruleId']] = action.payload['name'];
        },
        clearEdit: (state) => {
            state.editSelectedRuleId = "";
            state.editChosenRuleIds = [];
            state.editRuleIdsToNames = {};
            state.editPageKey = "";
            state.editComponentKey = "";
        },
    }
});

export default canvasReducer;
export const { 
    setSystems, 
    incrementIRUsage, 
    decrementIRUsage, 
    setSelectedRuleId, 
    addChosenRuleId, 
    removeChosenRuleId, 
    clearChosenRuleIds,
    clearRulesToNames,
    setRuleIdName,
    setEditRule,
    addEditChosenRuleId,
    editRemoveChosenRuleId,
    clearEditChosenRuleIds,
    clearEditRulesToNames,
    editSetRuleIdName,
    reorderChosenRuleIds,
    reorderEditChosenRuleIds,
    clearEdit,
} = canvasReducer.actions;