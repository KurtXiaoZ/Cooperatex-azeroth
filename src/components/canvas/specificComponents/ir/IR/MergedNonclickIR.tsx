
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch } from "react-redux";
import { setComponent } from "redux/pagesReducer";
import store from "redux/store";
import { IRSubButton } from "./IRButton/IRSubButton";
import { IRInput } from "./IRInput";
import { IRSelector } from "./IRSelector";

export function MergedNonclickIR(props: any) {
    console.log('MergedNonclickIR');
    const dispatch = useDispatch();

    const dragSelectorEnd = (e: any, data: DraggableData) => {
        const {x, y} = data;
        const newComponent = JSON.parse(JSON.stringify(props.source));
        newComponent.selectorX = x;
        newComponent.selectorY = y;
        dispatch(setComponent({pageKey: props.pageKey, componentKey: props.componentKey, component: newComponent}));
    }

    const dragButtonEnd = (e: any, data: DraggableData) => {
        const {x, y} = data;
        const newComponent = JSON.parse(JSON.stringify(props.source));
        newComponent.buttonX = x;
        newComponent.buttonY = y;
        dispatch(setComponent({pageKey: props.pageKey, componentKey: props.componentKey, component: newComponent}));
    }

    const dragInputEnd = (e: any, data: DraggableData) => {
        const {x, y} = data;
        const newComponent = JSON.parse(JSON.stringify(props.source));
        newComponent.inputX = x;
        newComponent.inputY = y;
        dispatch(setComponent({pageKey: props.pageKey, componentKey: props.componentKey, component: newComponent}));
    }
      


    return <>
        <Draggable
            bounds="parent"
            axis="both"
            grid={[1,1]}
            position={{x: props.source.selectorX, y: props.source.selectorY}}
            onMouseDown={(e) => e.stopPropagation()}
            onStop={dragSelectorEnd}
        >
            <div style={{width: 'fit-content', height: 'fit-content', position: 'absolute', zIndex: 200}}>
                <IRSelector pageKey={props.pageKey} componentKey={props.componentKey} source={props.source} />
            </div>
        </Draggable>
        <Draggable
            bounds="parent"
            axis="both"
            grid={[1,1]}
            position={{x: props.source.buttonX, y: props.source.buttonY}}
            onMouseDown={(e) => e.stopPropagation()}
            onStop={dragButtonEnd}
        >
            <div style={{width: 'fit-content', height: 'fit-content', position: 'absolute'}}>
                <IRSubButton pageKey={props.pageKey} componentKey={props.componentKey} source={props.source}/>
            </div>
        </Draggable>
        <Draggable
            bounds="parent"
            axis="both"
            grid={[1,1]}
            position={{x: props.source.inputX, y: props.source.inputY}}
            onMouseDown={(e) => e.stopPropagation()}
            onStop={dragInputEnd}
        >
            <div style={{width: 'fit-content', height: 'fit-content', position: 'absolute'}}>
                <IRInput pageKey={props.pageKey} componentKey={props.pageKey} source={props.source} />
            </div>
        </Draggable>
    </>
}