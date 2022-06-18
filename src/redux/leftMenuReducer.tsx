import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const leftMenuReducer = createSlice({
    name: 'leftMenu',
    initialState: {
        selectedMainType: "",           // 选中的一级选项
        selectedSecondType: "",         // 选中的二级选项
        selectedThirdType: "",          // 选中的三级级选项
        selectedSystemId: "",           // 选中的系统的ID
    },
    reducers: {
        setSelectedMainType: (state, action: PayloadAction<string>) => {
            state.selectedMainType = action.payload;
        },
        setSelectedSecondType: (state, action: PayloadAction<string>) => {
            state.selectedSecondType = action.payload;
        },
        setSelectedThirdType: (state, action: PayloadAction<string>) => {
            state.selectedThirdType = action.payload;
        },
        setSelectedSystemId: (state, action: PayloadAction<string>) => {
            state.selectedSystemId = action.payload;
        },
    }
});

export default leftMenuReducer;
export const { setSelectedMainType, setSelectedSecondType, setSelectedThirdType, setSelectedSystemId } = leftMenuReducer.actions;