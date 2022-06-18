import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const rightMenuReducer = createSlice({
    name: 'rightMenu',
    initialState: {
        frontendKeys: ["defaultFrontend"] as string[],      // 所有frontend的key
        selectedFrontEnd: 0,                                // 选中的frontend的index
    },
    reducers: {
        addFrontendKey: (state, action: PayloadAction<string>) => {
            state.frontendKeys.push(action.payload);
        },
        setSelectedFrontEnd: (state, action: PayloadAction<number>) => {
            state.selectedFrontEnd = action.payload;
        },
        deleteFrontendKey: (state, action: PayloadAction<number>) => {
            state.frontendKeys.splice(action.payload, 1);
            if(action.payload === state.selectedFrontEnd) state.selectedFrontEnd = 0;
        },
    }
});

export default rightMenuReducer;
export const { 
    addFrontendKey, 
    setSelectedFrontEnd, 
    deleteFrontendKey, 
} = rightMenuReducer.actions;