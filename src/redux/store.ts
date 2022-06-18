import { configureStore } from '@reduxjs/toolkit';
import { canvasReducer } from './canvasReducer';
import frontendsReducer from './frontendsReducer';
import irReducer from './irReducer';
import leftMenuReducer from './leftMenuReducer';
import pagesReducer from './pagesReducer';
import rightMenuReducer from './rightMenuReducer';

const store = configureStore({
    reducer: {
        canvas: canvasReducer.reducer,
        ir: irReducer.reducer,
        leftMenu: leftMenuReducer.reducer,
        rightMenu: rightMenuReducer.reducer,
        frontends: frontendsReducer.reducer,
        pages: pagesReducer.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
