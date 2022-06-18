import { SetterFooter, SetterHeader } from 'components/canvas/CanvasComponent/Setter';
import { PopUp } from 'components/RightMenu/PopUp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComponentToCanvas, addTab, deleteTab, removeComponent, removeComponentFromCanvas, setComponent, setComponentStyle, setTabName } from 'redux/pagesReducer';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { RootState } from 'redux/store';
import HandlerIcon from './icons/dots.svg';
import DeleteIcon from './icons/delete.svg';
import EditIcon from './icons/edit.svg';
import './index.less';

function array_move(arr: any, old_index: number, new_index: number) {
    let cutOut = arr.splice(old_index, 1) [0]; // cut the element at index 'from'
    arr.splice(new_index, 0, cutOut);
};

let confirmed = false;

export function SwitcherSetterManage(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);

    if(!component) return <></>;

    return <>
        {component.fixed ? <SetterTabs /> : <SetterSize />}
    </>
}

function SetterSize(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);

    const dispatch = useDispatch();
    const [width, setWidth] = useState(parseInt(component?.style?.width));
    const [height, setHeight] = useState(parseInt(component?.style?.height));
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        setWidth(component?.style?.width);
    }, [component?.style?.width]);
    useEffect(() => {
        setHeight(component?.style?.height);
    }, [component?.style?.height]);

    useEffect(() => {
        return () => {
            if(!confirmed) {
                dispatch(removeComponent({pageKey: pageKey, componentKey: componentKey}));
            }
            else confirmed = false;
        }
    }, []);

    if(!component) return <></>;

    const confirm = async () => {
        confirmed = true;
        const newComponent = JSON.parse(JSON.stringify(component));
        newComponent.style.width = width;
        newComponent.style.height = height;
        newComponent.fixed = true;
        await dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }


    const onCancel = () => {
        dispatch(removeComponent({pageKey: pageKey, componentKey: componentKey}));
    }
    
    return <>
    <SetterHeader title={'Basic Setting'}/>
    <div className='line-setter-content'>
        <div className='line-setter-content-color-title'>Size of Switcher</div>
        <div className='line-setter-content-size'>
            <span className='line-setter-content-size-title'>Width</span>
            <input className='line-setter-content-size-input' value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)}/>
            <span className='line-setter-content-size-title'>Height</span>
            <input className='line-setter-content-size-input' value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)}/>
        </div>
        <div className='switcher-setter-footer'>
            <div className='switcher-setter-footer-create' onClick={() => setWarning(true)}>Create</div>
            <div className='switcher-setter-footer-cancel' onClick={onCancel}>Cancel</div>
        </div>
    </div>
    <PopUp
        text={"This page and all of its content will be deleted, please confirm whether to delete."}
        display={warning} 
        onConfirm={confirm} 
        onCancel={() => setWarning(false)}
    />
    </>
}

function SetterTabs(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const tabOrder = useSelector((state: RootState) => state.pages[pageKey].components[componentKey].tabOrder);

    useEffect(() => {
        if(component.tabOrder.indexOf(undefined) !== -1) {
            const newComponent = JSON.parse(JSON.stringify(component));
            newComponent.tabOrder.splice(component.tabOrder.indexOf(undefined), 1);
            dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
        }
    }, [tabOrder]);

    const dispatch = useDispatch();
    
    if(!component) return <></>;

    const onSortEnd = (data: any) => {
        const newTabOrder = JSON.parse(JSON.stringify(component.tabOrder));
        const newComponent = JSON.parse(JSON.stringify(component));
        array_move(newTabOrder, data.oldIndex, data.newIndex);
        newComponent.tabOrder = newTabOrder;
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
    }

    const addNewTab = () => {
        dispatch(addTab({pageKey: pageKey, componentKey: componentKey}));
    }
    
    return <>
    <SetterHeader title={'Manage Switcher'}/>
    <div className='switcher-setter-manage-content'>
        <SortableList items={tabOrder} onSortEnd={onSortEnd}/>
        <div className='switcher-setter-add-new' style={{
                backgroundColor: component.tabOrder.length <= 2 ? '#C698DC' : '#CCCCCC',
            }}
            onClick={component.tabOrder.length <= 2 ? addNewTab : undefined}
        >+ Add New</div>
    </div>
    </>
}

const SortableItem = SortableElement((props: any) => {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);

    const dispatch = useDispatch();

    const [title, setTitle] = useState(props.value);
    const [editting, setEditting] = useState(false);
    
    useEffect(() => {
        const cancelEditting = () => {
            setEditting(false);
            const tabNames = component.tabOrder;
            for(let tabName of tabNames) {
                if(tabName === title) {
                    console.log(tabName);
                    setTitle(component.tabOrder[props.tabIndex]);
                    document.onmousedown = null;
                    return;
                }
            }
            dispatch(setTabName({pageKey: pageKey, componentKey: componentKey, tabIndex: props.tabIndex, newTabName: title}));
            document.onmousedown = null;
        }
        if(editting) {
            document.onmousedown = cancelEditting;
        }
    }, [editting, title]);

    const changeTitle = (e: any) => {
        e.stopPropagation();
        setTitle(e.target.value);
    }

    const selectTab = () => {
        const newComponent = JSON.parse(JSON.stringify(component));
        const curTab = newComponent.tabs[newComponent.selectedTab];
        curTab.forEach((key: string) => {
            dispatch(removeComponentFromCanvas({pageKey: pageKey, componentKey: key}));
        });
        newComponent.selectedTab = props.value;
        dispatch(setComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
        const newTab = newComponent.tabs[newComponent.selectedTab];
        newTab.forEach((key: string) => {
            dispatch(addComponentToCanvas({pageKey: pageKey, componentKey: key}));
        })
    }   

    return <div className='switcher-setter-option' onClick={selectTab}>
        <img src={HandlerIcon} className='switcher-setter-option-handler'/>
        <input 
            className='switcher-setter-option-title' 
            value={title} 
            onMouseDown={(e) => e.stopPropagation()} 
            onChange={changeTitle} 
            disabled={!editting}
            style={{
                color: component.selectedTab === props.value ? '#C698DC' : '#4D4D4D',
            }}
            maxLength={15}
        />
        <img src={DeleteIcon} className='switcher-setter-option-delete' style={{display: props.tabIndex <= 1 ? 'none' : 'block'}} onMouseDown={(e) => {
            e.stopPropagation();
            dispatch(deleteTab({pageKey: pageKey, componentKey: componentKey, tabIndex: props.tabIndex}));
        }}/>
        <img src={EditIcon} className='switcher-setter-option-edit' onMouseDown={(e) => {
            e.stopPropagation();
            setEditting(true);
        }}/>
    </div>
});

const SortableList = SortableContainer((props: any) => {
  return (
    <div>
      {props.items.map((value: any, index: number) => (
        <SortableItem key={`item-${value}`} index={index} tabIndex={index} value={value}/>
      ))}
    </div>
  );
});