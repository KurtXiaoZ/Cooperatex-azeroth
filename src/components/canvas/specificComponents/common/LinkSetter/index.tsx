import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import './index.less';
import Selector from './selector.svg';
import FolderArrow from './folderArrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from 'redux/store';
import { useEffect, useState } from 'react';
import { setComponent } from 'redux/pagesReducer';
import AnimateHeight from 'react-animate-height';

export function LinkSetter(props: any) {
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[state.rightMenu.selectedFrontEnd]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const pages = useSelector((state: RootState) => state.frontends[frontendKey].pages);

    const dispatch = useDispatch();

    const [linkDestination, setLinkDestination] = useState("");
    const [displayPages, setDisplayPages] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);

    useEffect(() => {
        if(component?.linkTo) setLinkDestination(component?.linkTo);
    }, [component?.linkTo])

    const renderPages = () => {
        let res: any = [];
        pages.mainPageKeys.forEach((pageKey: string) => {
            res.push(<OptionMainPage pageKey={pageKey} setLinkDestination={setLinkDestination}/>);
        });
        pages.subFolderKeys.forEach((subFolderKey: string) => {
            res.push(<div className='link-setter-content-pages-folder'>
                <span className='link-setter-content-pages-folder-title'>{pages.subFolders[subFolderKey].name}</span>
                <img className='link-setter-content-pages-folder-icon' src={FolderArrow}/>
            </div>);
            pages.subFolders[subFolderKey].subpages.forEach((pageKey: string) => {
                res.push(<OptionSubPage pageKey={pageKey} setLinkDestination={setLinkDestination}/>);
            });
        });
        pages.subPageKeys.forEach((pageKey: string) => {
            res.push(<OptionMainPage pageKey={pageKey} setLinkDestination={setLinkDestination}/>);
        });
        return res;
    }

    return <>
        <SetterHeader title="Link"/>
        <div className='link-setter-content'>
            <div className='link-setter-content-title'>Link to which page</div>
            <div className='link-setter-content-selector' onClick={() => {
                    if(!displayPages) setDisplayPages(true);
                    else {
                        setAnimationDone(false);
                        setDisplayPages(false);
                    }
            }}>
                <span className='link-setter-content-selector-page'>{store.getState().pages[linkDestination]?.name || 'None'}</span>
                <img className='link-setter-content-selector-icon' src={Selector}/>
            </div>
            {(displayPages && animationDone) ?
            <div className='link-setter-content-pages'>
                {renderPages()}
            </div> :
            <AnimateHeight
                className='link-setter-content-animation'
                duration={800}
                height={displayPages ? 'auto' : 0}
                onAnimationEnd={() => {
                    if(displayPages) setAnimationDone(true);
                    else setAnimationDone(false);
                }}
            >
                {renderPages()}
            </AnimateHeight>
            }
            <SetterFooter action={() => {
                const newComponent = JSON.parse(JSON.stringify(component));
                if(linkDestination !== "") newComponent.linkTo = linkDestination;
                dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
            }}/>
        </div>
    </>
}

function OptionMainPage(props: any) {
    const pageName = useSelector((state: RootState) => state.pages[props.pageKey].name);
    return <div className='link-setter-content-pages-main' onClick={() => {
        props.setLinkDestination(props.pageKey);
        
    }}>{pageName}</div>
}

function OptionSubPage(props: any) {
    const pageName = useSelector((state: RootState) => state.pages[props.pageKey].name);
    return <div className='link-setter-content-pages-sub' onClick={() => props.setLinkDestination(props.pageKey)}>{pageName}</div>
}