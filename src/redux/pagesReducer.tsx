import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultMenuStyle } from "components/canvas/specificComponents/menu/Menu";
import uniqid from 'uniqid';

const defaultMenu = {
    type: 'menu',
    style: defaultMenuStyle,
    x: 0,
    y: 0,
}
/**
 * 包含Azeroth中用户创建的所有页面的状态，就是在这里获取组件状态
 */
const pagesReducer = createSlice({
    name: 'pages',
    initialState: { // page的key：page的状态
        mainPage1: {
            name: 'Page1',  // page的名字
            canvas: ['menuPage1'],      // 显示在画布上的这个page的所有组件的key，之所以单独记录是因为由于swither和banner组件的存在，可能不是所有页面上的组件都被渲染
            switcherKeys: [],           // 记录这个页面所有switcher组件的key
            components: {menuPage1: defaultMenu},       // 记录所有组件的状态，组件的键对应组件的信息
            scrollHeight: 710           // 当前画布的滚动高度，用来实现画布高度的自动拉长
        },
        mainPage2: {name: 'Page2', canvas: ['menuPage2'], switcherKeys: [], components: {menuPage2: defaultMenu}, scrollHeight: 710},
        mainPage3: {name: 'Page3', canvas: ['menuPage3'], switcherKeys: [], components: {menuPage3: defaultMenu}, scrollHeight: 710},
        /* pageKey: {
            name: pageName,
            canvas: [componentKey1, componentKey2...]
            switherKeys: [switcherKey1, switcherKey2...]
            components: {
                componentKey: {

                }
            }
        }
       /*
        
       */
    },
    reducers: {
        renamePage: (state, action: PayloadAction<object>) => {
            state[action.payload['pageKey']].name = action.payload['name'];
        },
        addPage: (state, action: PayloadAction<object>) => {
            state[action.payload['pageKey']] = {name: action.payload['name'], components: action.payload['components'], switcherKeys: [], canvas: [], scrollHeight: 710};
        },
        deletePage: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },
        copyPage: (state, action: PayloadAction<object>) => {
            state[action.payload['newKey']] = Object.assign({}, state[action.payload['oldKey']]);
        },
        setComponentStyle: (state, action: PayloadAction<object>) => {
            state[action.payload['pageKey']].components[action.payload['componentKey']].style = Object.assign({}, state[action.payload['pageKey']].components[action.payload['componentKey']].style, action.payload['style']);
        },
        setComponent: (state, action: PayloadAction<object>) => {
            state[action.payload['pageKey']].components[action.payload['componentKey']] = action.payload['component'];
        },
        setComponentPosition: (state, action: PayloadAction<object>) => {
            if(action.payload['x']) state[action.payload['pageKey']].components[action.payload['componentKey']].x = action.payload['x'];
            if(action.payload['y']) state[action.payload['pageKey']].components[action.payload['componentKey']].y = action.payload['y'];
        },
        setComponentHeight: (state, action: PayloadAction<object>) => {
            state[action.payload['pageKey']].components[action.payload['componentKey']].style.height = action.payload['height'];
        },
        setComponentWidth: (state, action: PayloadAction<object>) => {
            state[action.payload['pageKey']].components[action.payload['componentKey']].style.width = action.payload['width'];
        },
        addComponent: (state, action: PayloadAction<object>) => {
            const componentKey = action.payload['componentKey'];
            const pageKey = action.payload['pageKey'];
            const component = action.payload['component'];
            state[pageKey].components[componentKey] = component;
            state[pageKey].canvas.push(componentKey);
            if(component.type === 'switcher1' || component.type === 'switcher2') {
                state[pageKey].switcherKeys.push(componentKey);
            }
        },
        removeComponent: (state, action: PayloadAction<object>) => {
            const pageKey = action.payload['pageKey'];
            const componentKey = action.payload['componentKey'];
            const component = state[pageKey].components[componentKey];
            if(component.type === 'switcher1' || component.type === 'switcher2') {
                state[pageKey].switcherKeys.splice(state[pageKey].switcherKeys.indexOf(componentKey), 1);
            }
            delete state[pageKey].components[componentKey];
            state[pageKey].canvas.splice(state[pageKey].canvas.indexOf(componentKey), 1);
            
        },
        addTabComponent: (state, action: PayloadAction<object>) => {
            console.log('addTabComponent');
            const pageKey = action.payload['pageKey'];
            const componentKey = action.payload['componentKey'];
            const switcherKey = action.payload['switcherKey'];
            const selectedTabName = state[pageKey].components[switcherKey].selectedTab;
            state[pageKey].components[switcherKey].tabs[selectedTabName].push(componentKey);
        },
        removeTabComponent: (state, action: PayloadAction<object>) => {
            console.log('removeTabComponent');
            const pageKey = action.payload['pageKey'];
            const componentKey = action.payload['componentKey'];
            const switcherKey = action.payload['switcherKey'];
            const selectedTabName = state[pageKey].components[switcherKey].selectedTab;
            state[pageKey].components[switcherKey].tabs[selectedTabName].splice(state[pageKey].components[switcherKey].tabs[selectedTabName].indexOf(componentKey), 1);
        },
        removeComponentFromCanvas: (state, action: PayloadAction<object>) => {
            const pageKey = action.payload['pageKey'];
            const componentKey = action.payload['componentKey'];
            state[pageKey].canvas.splice(state[pageKey].canvas.indexOf(componentKey), 1);
        },
        addComponentToCanvas: (state, action: PayloadAction<object>) => {
            const pageKey = action.payload['pageKey'];
            const componentKey = action.payload['componentKey'];
            state[pageKey].canvas.push(componentKey);
        },
        setTabName: (state, action: PayloadAction<object>) => {
            console.log('setTabName');
            const pageKey = action.payload['pageKey'];
            const componentKey = action.payload['componentKey'];
            const tabIndex = action.payload['tabIndex'];
            const newTabName = action.payload['newTabName'];
            const component = state[pageKey].components[componentKey];
            const oldTabName = component.tabOrder[tabIndex];
            const tab = JSON.parse(JSON.stringify(component.tabs[component.tabOrder[tabIndex]]));
            delete state[pageKey].components[componentKey].tabs[component.tabOrder[tabIndex]];
            state[pageKey].components[componentKey].tabs[newTabName] = tab;
            state[pageKey].components[componentKey].tabOrder[tabIndex] = newTabName;
            if(component.selectedTab === oldTabName) {
                state[pageKey].components[componentKey].selectedTab = newTabName;
            }
        },
        deleteTab: (state, action: PayloadAction<object>) => {
            const pageKey = action.payload['pageKey'];
            const componentKey = action.payload['componentKey'];
            const tabIndex = action.payload['tabIndex'];
            const component = state[pageKey].components[componentKey];
            const oldTabName = component.tabOrder[tabIndex];
            const tab = component.tabs[oldTabName];
            tab.forEach((key: string) => {
                delete state[pageKey].components[key];
                state[pageKey].canvas.splice(state[pageKey].canvas.indexOf(key), 1);
            });
            delete state[pageKey].components[componentKey].tabs[oldTabName];
            state[pageKey].components[componentKey].tabOrder.pop();
            if(oldTabName === component.selectedTab) {
                state[pageKey].components[componentKey].selectedTab = component.tabOrder[0];
            }
        },
        addTab: (state, action: PayloadAction<object>) => {
            const pageKey = action.payload['pageKey'];
            const componentKey = action.payload['componentKey'];
            const component = state[pageKey].components[componentKey];
            let newTabName = 'newTab';
            let iterator = 1;
            while(true) {
                const tmp = newTabName + iterator;
                if(component.tabOrder.indexOf(tmp) === -1) {
                    newTabName = tmp;
                    break;
                }
                iterator++;
            }
            component.tabOrder.push(newTabName);
            component.tabs[newTabName] = [];
        },
        setScrollHeight: (state, action: PayloadAction<object>) => {
            const pageKey = action.payload['pageKey'];
            state[pageKey].scrollHeight = action.payload['scrollHeight'];
        },
    }
});

export default pagesReducer;
export const {
    renamePage,
    addPage,
    deletePage,
    copyPage,
    setComponentStyle,
    setComponent,
    setComponentPosition,
    setComponentHeight,
    setComponentWidth,
    addComponent,
    removeComponent,
    addTabComponent,
    removeTabComponent,
    removeComponentFromCanvas,
    addComponentToCanvas,
    setTabName,
    deleteTab,
    addTab,
    setScrollHeight,
} = pagesReducer.actions;