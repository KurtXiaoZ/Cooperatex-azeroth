import { useDispatch } from 'react-redux';
import { setSelectedPage } from 'redux/frontendsReducer';
import store from 'redux/store';
import './index.less';

export function SearchResults(props: any) {

    const renderResults = (input: string) => {
        let res: any = []
        let frontend = store.getState().frontends[props.frontendKey].pages;
        let pages = store.getState().pages;
        let subpages = frontend.subPageKeys;
        // search subpages
        subpages.forEach((pageKey: string) => {
            let pageName = pages[pageKey].name;
            if(pageName.toLowerCase().includes(input.toLowerCase())) res.push(<SearchResult 
                pageName={pageName}
                pageKey={pageKey}
                setSearchInput={props.setSearchInput}
                frontendKey={props.frontendKey}
            />);
        });
        // search subFolderPages
        for(let subFolder in frontend.subFolders) {
            frontend.subFolders[subFolder].subpages.forEach((pageKey: string) => {
                let pageName = pages[pageKey].name;
                if(pageName.toLowerCase().includes(input.toLowerCase())) res.push(<SearchResult 
                    pageName={pageName}
                    pageKey={pageKey}
                    setSearchInput={props.setSearchInput}
                    frontendKey={props.frontendKey}
                />);
            })
        }

        return res;
    }

    return <div className='right-menu-search-results'>
        {renderResults(props.searchInput)}
    </div>
}

function SearchResult(props: any) {
    const dispatch = useDispatch();

    const selectPage = () => {
        props.setSearchInput("");
        dispatch(setSelectedPage({key: props.frontendKey, selected: props.pageKey}));
    }

    return <div className='right-menu-search-result' onClick={selectPage}>
        {props.pageName}
    </div>
}