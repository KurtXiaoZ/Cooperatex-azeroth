import './index.less';
import AdditionIcon from '../../../assets/svgs/addition.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useEffect, useRef, useState } from 'react';
import { RightMenuMainPage } from '../RightMenuMainPage';
import { RightMenuSubPage } from '../RightMenuSubPage';
import SearchIcon from '../icons/search.svg';
import store from 'redux/store';
import { addPage } from 'redux/pagesReducer';
import uniqid from 'uniqid';
import { addMainPageKey, addSubFolderKey, addSubPageKey, setEdittingPage, addSubFolder, setSelectedPage } from 'redux/frontendsReducer';
import { RightMenuFolder } from '../RightMenuFolder';
import { SearchResults } from '../SearchResults';
import { setSelectedKey, setSetterType } from 'redux/canvasReducer';
import { defaultMenuStyle } from 'components/canvas/specificComponents/menu/Menu';

export function RightMenuPages(props: any) {
    const selectedFrontEnd = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const selectedFrontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontEnd]);
    const mainPages = useSelector((state: RootState) => state.frontends[selectedFrontendKey]['pages']['mainPageKeys']);
    const subPageKeys = useSelector((state: RootState) => state.frontends[selectedFrontendKey]['pages']['subPageKeys']);
    const subFolderKeys = useSelector((state: RootState)=> state.frontends[selectedFrontendKey]['pages']['subFolderKeys']);
    const selectedPage = useSelector((state: RootState) => state.frontends[selectedFrontendKey]['pages']['selectedPage']);
    const dispatch = useDispatch();
    const [insertKey, setInsertKey] = useState("");
    const [overallDragging, setOverallDragging] = useState(false);
    const [displaySubPage, setDisplaySubPage] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if(displaySubPage) {
            document.onclick = () => {
                setDisplaySubPage(false);
                document.onclick = null;
            }
        }
    }, [displaySubPage]);

    useEffect(() => {
        dispatch(setSetterType(""));
        dispatch(setSelectedKey(""));
    }, [selectedPage]);

    const renderMainPages = (pages: any) => {
        return pages.map((key: any, i: number) => {
            return <RightMenuMainPage
                key={key} 
                pageIndex={i}
                pageKey={key}
                frontendKey={selectedFrontendKey}
                insertKey={insertKey}
                setInsertKey={setInsertKey}
                overallDragging={overallDragging}
                setOverallDragging={setOverallDragging}
            />
        })
    }
    const addMainPage = () => {
        let pageKey = uniqid();
        dispatch(addPage({pageKey: pageKey, name: `Page${store.getState().frontends[selectedFrontendKey].pages.mainPageKeys.length + 1}`, components: {[uniqid("newMenu")]: {type: 'menu', style: defaultMenuStyle, x: 0, y: 0}}}));
        dispatch(addMainPageKey({frontendKey: selectedFrontendKey, pageKey: pageKey}));
        dispatch(setEdittingPage({frontendKey: selectedFrontendKey, pageKey: pageKey}));
        dispatch(setSelectedPage({key: selectedFrontendKey, selected: pageKey}));
    }

    const renderSubFolders = (folders: any) => {
        return folders.map((key: any, i: number) => {
            return <RightMenuFolder 
                key={key}
                pageIndex={i}
                pageKey={key}
                frontendKey={selectedFrontendKey}
                insertKey={insertKey}
                setInsertKey={setInsertKey}
                overallDragging={overallDragging}
                setOverallDragging={setOverallDragging}
            />
        })
    }

    const mouseEnterPlaceHolder = () => {
        if(overallDragging) setInsertKey("placeholder");
    }

    const renderSubPages = (pages: any) => {
        let subPages = pages.map((key: any, i: number) => {
            return <RightMenuSubPage 
                key={key}
                pageIndex={i}
                pageKey={key}
                frontendKey={selectedFrontendKey}
                insertKey={insertKey}
                setInsertKey={setInsertKey}
                overallDragging={overallDragging}
                setOverallDragging={setOverallDragging}
            />
        });
        return <>
            <div onMouseEnter={mouseEnterPlaceHolder} 
                className='right-menu-sub-pages-placeholder' 
                style={{
                    display: pages.length === 0 ? 'block' : 'none',
                    borderTop: insertKey === "placeholder" ? '2px solid #D790F9' : '0px solid transparent',
                }}></div>
            {subPages}
        </>
    }
    const addSubPage = () => {
        let pageKey = uniqid();
        dispatch(addPage({pageKey: pageKey, name: `Page${store.getState().frontends[selectedFrontendKey].pages.subPageKeys.length + 1}`, components: {}}));
        dispatch(addSubPageKey({frontendKey: selectedFrontendKey, pageKey: pageKey}));
        dispatch(setEdittingPage({frontendKey: selectedFrontendKey, pageKey: pageKey}));
        dispatch(setSelectedPage({key: selectedFrontendKey, selected: pageKey}));
    }
    const addCurFolder = () => {
        let pageKey = uniqid();
        dispatch(addSubFolder({frontendKey: selectedFrontendKey, pageKey: pageKey, name: `Folder${store.getState().frontends[selectedFrontendKey].pages.subFolderKeys.length + 1}`}));
        dispatch(addSubFolderKey({frontendKey: selectedFrontendKey, pageKey: pageKey}));
        dispatch(setEdittingPage({frontendKey: selectedFrontendKey, pageKey: pageKey}));
    }
    
    const handleSearch = (e: any) => {
        setSearchInput(e.target.value);
    }

    const displayAddSub = (e: any) => {
        e.nativeEvent.stopImmediatePropagation();
        setDisplaySubPage(true);
    }

    return <div className='right-menu-pages'>
        <div className='right-menu-pages-main'>
            <div className='right-menu-pages-main-header'>
                <span className='right-menu-pages-main-header-title'>Main Page</span>
                <img className='right-menu-pages-icon right-menu-pages-main-header-add' src={AdditionIcon} onClick={addMainPage}/>
            </div>
            <div className='right-menu-pages-main-content'>
                {renderMainPages(mainPages)}
            </div>
        </div>
        <div className='right-menu-pages-sub'>
            <div className='right-menu-pages-main-header'>
                <span className='right-menu-pages-main-header-title'>Subpage</span>
                <img className='right-menu-pages-icon right-menu-pages-main-header-add' src={AdditionIcon} onClick={displayAddSub}/>
                <div className='right-menu-pages-add-subpage' style={{display: displaySubPage ? 'block' : 'none'}}>
                    <span className='right-menu-pages-add-subpage-option' onClick={addCurFolder}>Add a Folder</span>
                    <span className='right-menu-pages-add-subpage-option' onClick={addSubPage}>Add a Page</span>
                </div>
            </div>
            <div className='right-menu-pages-sub-search-area'>
                <img className='right-menu-pages-icon right-menu-pages-sub-search-icon' src={SearchIcon}/>
                <input className='right-menu-pages-sub-search-input' placeholder='Search page name' onChange={handleSearch} value={searchInput}/>
            </div>
            {
            searchInput === "" ? 
            <>
                <div className='right-menu-pages-sub-folders'>
                    {renderSubFolders(subFolderKeys)}
                </div>
                <div className='right-menu-pages-sub-pages'>
                    {renderSubPages(subPageKeys)}
                </div>
            </> 
            :
            <SearchResults 
                searchInput={searchInput} 
                setSearchInput={setSearchInput}
                frontendKey={selectedFrontendKey}
            />
            }
        </div>
    </div>
}