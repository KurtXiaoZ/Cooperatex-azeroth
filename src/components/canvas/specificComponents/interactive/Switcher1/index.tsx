import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSetterType } from 'redux/canvasReducer';
import { addComponentToCanvas, removeComponentFromCanvas, setComponent } from 'redux/pagesReducer';
import { RootState } from 'redux/store';
import './index.less';



export function Switcher1(props: any) {
    const components = useSelector((state: RootState) => state.pages[props.pageKey].components);
    const component = useSelector((state: RootState) => state.pages[props.pageKey].components[props.componentKey]);
    const tabOrder = useSelector((state: RootState) => state.pages[props.pageKey].components[props.componentKey].tabOrder);
    const dispatch = useDispatch();


    useEffect(() => {
        selectTab(component.tabOrder[0]);
    }, []);

    const renderTabs = () => {
        let tabs = [];
        for(let tabName of tabOrder) {
            tabs.push(<span 
                className='switcher-header-tab'
                style={{
                    color: component.selectedTab === tabName ? props.source.style.chosenColor : props.source.style.defaultColor
                }}
                onClick={() => selectTab(tabName)}
            >{tabName}</span>);
        }
        return tabs;
    }

    const selectTab = (tabName: string) => {
        const newComponent = JSON.parse(JSON.stringify(component));
        const curTab = newComponent.tabs[newComponent.selectedTab];
        curTab.forEach((key: string) => {
            dispatch(removeComponentFromCanvas({pageKey: props.pageKey, componentKey: key}));
        });
        newComponent.selectedTab = tabName;
        dispatch(setComponent({pageKey: props.pageKey, componentKey: props.componentKey, component: newComponent}));
        const newTab = newComponent.tabs[newComponent.selectedTab];
        newTab.forEach((key: string) => {
            dispatch(addComponentToCanvas({pageKey: props.pageKey, componentKey: key}));
        })
    }
    
    return <div className='switcher' style={{
            ...props.source.style,
            fontSize: undefined
        }}>
        <div className='switcher-header'>
            {renderTabs()}
        </div>
        <div 
            className='switcher-content'
            style={{
                height: parseInt(component.style.height) - 28,
                width: component.style.width
            }}
        >

        </div>
    </div>
}