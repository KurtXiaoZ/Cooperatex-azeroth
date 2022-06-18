import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type setAlignType = {
    left: number,
    right: number,
    top: number,
    bottom: number,
    midHor: number,
    midVer: number
}

export const canvasReducer = createSlice({
    name: 'canvas',
    initialState: {
        selectedKey: "",    // 当前画布上被选中的组件的key
        selectedPosition: {     // 当前画布上被选中的组件的位置：左、右、上、下、水平中轴、垂直中轴，数值都是css的top/left值
            left: 0, right: 0, top: 0, bottom: 0, midHor: 0, midVer: 0
        },
        align: {        // 当前画布组件拖拽/缩放时，需要对齐的位置：左、右、上、下、水平中轴、垂直中轴，数值都是css的top/left值
            left: 0, top: 0, right: 0, bottom: 0, midHor: 0, midVer: 0
        },
        setterType: "",     // 当前编辑器的类型
    },
    reducers: {
        // 改变选中组件的位置
        setSelectedPosition: (state, action: PayloadAction<object>) => {
            state.selectedPosition = Object.assign({}, state.selectedPosition, action.payload);
        },
        // 设置新的被选中组件，设置它的key
        setSelectedKey: (state, action: PayloadAction<string>) => {
            state.selectedKey = action.payload;
        },
        // 设置对齐位置
        setAlign: (state, action: PayloadAction<setAlignType>) => {
            state.align = Object.assign({}, action.payload);
        },
        // 设置编辑器类型
        setSetterType: (state, action: PayloadAction<string>) => {
            state.setterType = action.payload;
        },
    }
});

export const { setSelectedPosition, setSelectedKey, setAlign, setSetterType } = canvasReducer.actions;