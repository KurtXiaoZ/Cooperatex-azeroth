import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uniqid from 'uniqid';

/**
 * 用来把数组的一个元素放到新的位置
 * @param arr       数组
 * @param old_index         元素原本的位置
 * @param new_index         元素的新位置
 * @returns     改变后的数组
 */
function array_move(arr: any, old_index: number, new_index: number) {
    let cutOut = arr.splice(old_index, 1) [0]; // cut the element at index 'from'
    arr.splice(new_index, 0, cutOut);
    return arr;
};

function locateFolderPage(subFolders: any, subFolderKeys: any, folderPageKey: any) {
    for(let i = 0; i < subFolderKeys.length; ++i) {
        let subpages = subFolders[subFolderKeys[i]].subpages;
        if(subpages.indexOf(folderPageKey) !== -1) return subFolderKeys[i];
    }
    return "";
} 

const defaultFrontend = {
    mainPageKeys: [],
    selectedPage: '',
    edittingPage: "",
    subPageKeys: [],
    subFolderKeys: [],
    edittingSubPage: "",
    subFolders: {
        /* subFolderKey: {
            name: xxx,
            subpages: []
        }*/
    }
}

const frontendsReducer = createSlice({
    name: 'frontends',
    initialState: { // 键值对，每个key是Frontend的key，值是它的信息
        'defaultFrontend': {
            name: 'Default Frontend',       // frontend的名字
            usedIRs: 0,                     // 这个frontend里用了多少个IR
            pages: {
                mainPageKeys: ['mainPage1', 'mainPage2', 'mainPage3',],         // 这个frontend的主页面
                selectedPage: 'mainPage1',                                      // 这个frontend选中的页面
                edittingPage: "",                                               // 这个frontend正在被编辑的页面
                subPageKeys: [],                                                // 这个frontend的子页面的键
                subFolderKeys: [],                                              // 这个frontend的子页面文件夹的键
                edittingSubPage: "",                                            // 这个frontend正在被编辑的子页面
                subFolders: {                                                   // 所有子文件夹，键值对
                    /* subFolderKey: {  
                        name: xxx,                                              // 这个子文件夹的名字
                        subpages: []                                            // 这个子文件夹下面的子页面的key
                    }*/
                }
            }
        }
    },
    reducers: {
        addFrontend: (state, action: PayloadAction<object>) => {
            state[action.payload['key']] = {
                name: action.payload['name'], 
                usedIRs: 0, 
                pages: Object.assign({}, defaultFrontend)
            }
        },
        deleteFrontend: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },
        editFrontendName: (state, action: PayloadAction<object>) => {
            state[action.payload['key']]['name'] = action.payload['name'];
        },
        setSelectedPage: (state, action: PayloadAction<object>) => {
            state[action.payload['key']].pages.selectedPage = action.payload['selected'];
        },
        setEdittingPage: (state, action: PayloadAction<object>) => {
            state[action.payload['frontendKey']].pages.edittingPage = action.payload['pageKey'];
        },
        addMainPageKey: (state, action: PayloadAction<object>) => {
            state[action.payload['frontendKey']].pages.mainPageKeys.push(action.payload['pageKey']);
        },
        addSubPageKey: (state, action: PayloadAction<object>) => {
            state[action.payload['frontendKey']].pages.subPageKeys.push(action.payload['pageKey']);
        },
        reorderPageKeys: (state, action: PayloadAction<object>) => {
            let insertKey = action.payload['insertKey'];
            let pageKey = action.payload['pageKey'];
            let frontendKey = action.payload['frontendKey'];
            let frontend = state[frontendKey].pages;
            let pageKeyToSubFolder = locateFolderPage(frontend.subFolders, frontend.subFolderKeys, pageKey);
            let insertKeyToSubFolder = locateFolderPage(frontend.subFolders, frontend.subFolderKeys, insertKey);
            // mainPage --> mainPage
            if(frontend.mainPageKeys.indexOf(pageKey) !== -1 && frontend.mainPageKeys.indexOf(insertKey) !== -1) {
                let arr = [...frontend.mainPageKeys];
                array_move(arr, arr.indexOf(pageKey), arr.indexOf(insertKey));
                state[frontendKey].pages.mainPageKeys = [...arr];
            }
            // mainPage --> subPage
            if(frontend.mainPageKeys.indexOf(pageKey) !== -1 && frontend.subPageKeys.indexOf(insertKey) !== -1) {
                frontend.mainPageKeys.splice(frontend.mainPageKeys.indexOf(pageKey), 1);
                let subPageIndex = frontend.subPageKeys.indexOf(insertKey);
                frontend.subPageKeys.splice(subPageIndex, 0, pageKey);
            }
            // subPage --> subPage
            else if(frontend.subPageKeys.indexOf(pageKey) !== -1 && frontend.subPageKeys.indexOf(insertKey) !== -1) {
                let arr = [...frontend.subPageKeys];
                array_move(arr, arr.indexOf(pageKey), arr.indexOf(insertKey));
                state[frontendKey].pages.subPageKeys = [...arr];
            }
            // subPage --> mainPage
            else if(frontend.subPageKeys.indexOf(pageKey) !== -1 && frontend.mainPageKeys.indexOf(insertKey) !== -1) {
                let key = frontend.subPageKeys.splice(frontend.subPageKeys.indexOf(pageKey), 1)[0];
                let mainPageIndex = frontend.mainPageKeys.indexOf(insertKey);
                frontend.mainPageKeys.splice(mainPageIndex, 0, key);
            }
            // subPage --> subFolder
            else if(frontend.subPageKeys.indexOf(pageKey) !== -1 && frontend.subFolderKeys.indexOf(insertKey) !== -1) {
                let key = frontend.subPageKeys.splice(frontend.subPageKeys.indexOf(pageKey), 1)[0];
                frontend.subFolders[insertKey]['subpages'].push(key);
            }
            // mainPage --> subFolder
            else if(frontend.mainPageKeys.indexOf(pageKey) !== -1 && frontend.subFolderKeys.indexOf(insertKey) !== -1) {
                frontend.mainPageKeys.splice(frontend.mainPageKeys.indexOf(pageKey), 1);
                frontend.subFolders[insertKey]['subpages'].push(pageKey);
            }
            // folderPage --> mainPage
            else if(pageKeyToSubFolder !== "" && frontend.mainPageKeys.indexOf(insertKey) !== -1) {
                let subpages = frontend.subFolders[pageKeyToSubFolder].subpages;
                subpages.splice(subpages.indexOf(pageKey), 1);
                let mainPageIndex = frontend.mainPageKeys.indexOf(insertKey);
                frontend.mainPageKeys.splice(mainPageIndex, 0, pageKey);
            }
            // folderPage --> subPage
            else if(pageKeyToSubFolder !== "" && frontend.subPageKeys.indexOf(insertKey) !== -1) {
                let subpages = frontend.subFolders[pageKeyToSubFolder].subpages;
                subpages.splice(subpages.indexOf(pageKey), 1);
                let subPageIndex = frontend.subPageKeys.indexOf(insertKey);
                frontend.subPageKeys.splice(subPageIndex, 0, pageKey);
            }
            // folderPage --> subFolder
            else if(pageKeyToSubFolder !== "" && frontend.subFolderKeys.indexOf(insertKey) !== -1) {
                let subpages = frontend.subFolders[pageKeyToSubFolder].subpages;
                subpages.splice(subpages.indexOf(pageKey), 1);
                frontend.subFolders[insertKey]['subpages'].push(pageKey);
            }
            // subPage --> folderPage
            else if(frontend.subPageKeys.indexOf(pageKey) !== -1 && insertKeyToSubFolder !== "") {
                frontend.subPageKeys.splice(frontend.subPageKeys.indexOf(pageKey), 1);
                let subpages = frontend.subFolders[insertKeyToSubFolder].subpages;
                subpages.splice(subpages.indexOf(insertKey), 0, pageKey);
            }
            // mainPage --> folderPage
            else if(frontend.mainPageKeys.indexOf(pageKey) !== -1 && insertKeyToSubFolder !== "") {
                frontend.mainPageKeys.splice(frontend.mainPageKeys.indexOf(pageKey), 1);
                let subpages = frontend.subFolders[insertKeyToSubFolder].subpages;
                subpages.splice(subpages.indexOf(insertKey), 0, pageKey);
            }
            // folderPage --> folderPage
            else if(pageKeyToSubFolder !== "" && insertKeyToSubFolder !== "") {
                let pageKeyFolder = frontend.subFolders[pageKeyToSubFolder].subpages;
                let insertKeyFolder = frontend.subFolders[insertKeyToSubFolder].subpages;
                pageKeyFolder.splice(pageKeyFolder.indexOf(pageKey), 1);
                insertKeyFolder.splice(insertKeyFolder.indexOf(insertKey), 0, pageKey);
            }
            // mainPage --> placeholder
            else if(frontend.mainPageKeys.indexOf(pageKey) !== -1 && insertKey === "placeholder") {
                frontend.mainPageKeys.splice(frontend.mainPageKeys.indexOf(pageKey), 1);
                frontend.subPageKeys.push(pageKey);
            }
            // folderPage --> placeholder
            else if(pageKeyToSubFolder !== "" && insertKey === "placeholder") {
                let subpages = frontend.subFolders[pageKeyToSubFolder].subpages;
                subpages.splice(subpages.indexOf(pageKey), 1);
                frontend.subPageKeys.push(pageKey);
            }
        },
        addSubFolderKey: (state, action: PayloadAction<object>) => {
            state[action.payload['frontendKey']].pages.subFolderKeys.push(action.payload['pageKey']);
        },
        addSubFolder: (state, action: PayloadAction<object>) => {
            state[action.payload['frontendKey']].pages.subFolders[action.payload['pageKey']] = {
                name: action.payload['name'],
                subpages: [],
            }
        },
        renameSubFolder: (state, action: PayloadAction<object>) => {
            state[action.payload['frontendKey']].pages.subFolders[action.payload['pageKey']]['name'] = action.payload['name'];
        },
        deletePageKey: (state, action: PayloadAction<object>) => {
            let frontendKey = action.payload['frontendKey'];
            let pageKey = action.payload['pageKey'];
            let frontend = state[frontendKey].pages;
            // examine mainPageKeys
            for(let i = 0; i < frontend.mainPageKeys.length; ++i) {
                if(frontend.mainPageKeys[i] === pageKey) {
                    frontend.mainPageKeys.splice(i, 1);
                    break;
                }    
            }
            // examine subPageKeys
            for(let i = 0; i < frontend.subPageKeys.length; ++i) {
                if(frontend.subPageKeys[i] === pageKey) {
                    frontend.subPageKeys.splice(i, 1);
                    break;
                }
            }
            // examine subFolders
            for(let i = 0; i < frontend.subFolderKeys.length; ++i) {
                if(frontend.subFolderKeys[i] === pageKey) {
                    frontend.subFolderKeys.splice(i, 1);
                    delete frontend.subFolders[pageKey];
                    break;
                }
            }
            // examine subFolderPages
            for(let i in frontend.subFolders) {
                for(let j = 0; j < frontend.subFolders[i].subpages.length; ++j) {
                    if(frontend.subFolders[i].subpages[j] === pageKey) {
                        frontend.subFolders[i].subpages.splice(j, 1);
                        break;
                    }
                }
            }
            console.log(pageKey);
            console.log(state[frontendKey].pages.selectedPage);
            if(pageKey === state[frontendKey].pages.selectedPage) {
                state[frontendKey].pages.selectedPage = state[frontendKey].pages.mainPageKeys[0];
            }
        },
        copyPageKey: (state, action: PayloadAction<object>) => {
            let frontendKey = action.payload['frontendKey'];
            let oldKey = action.payload['oldKey'];
            let newKey = action.payload['newKey']
            let frontend = state[frontendKey].pages;
            // examine mainPageKeys
            for(let i = 0; i < frontend.mainPageKeys.length; ++i) {
                if(frontend.mainPageKeys[i] === oldKey) {
                    frontend.mainPageKeys.splice(i, 0, newKey);
                    return;
                }    
            }
            // examine subPageKeys
            for(let i = 0; i < frontend.subPageKeys.length; ++i) {
                if(frontend.subPageKeys[i] === oldKey) {
                    frontend.subPageKeys.splice(i, 0, newKey);
                    return;
                }
            }
            // examine subFolderPages
            for(let i in frontend.subFolders) {
                for(let j = 0; j < frontend.subFolders[i].subpages.length; ++j) {
                    if(frontend.subFolders[i].subpages[j] === oldKey) {
                        frontend.subFolders[i].subpages.splice(j, 0, newKey);
                        return;
                    }
                }
            }
        }
    }
});

export default frontendsReducer;
export const {
    addFrontend,
    deleteFrontend,
    editFrontendName,
    setSelectedPage,
    setEdittingPage,
    addMainPageKey,
    addSubPageKey,
    reorderPageKeys,
    addSubFolderKey,
    addSubFolder,
    renameSubFolder,
    deletePageKey,
    copyPageKey
} = frontendsReducer.actions;