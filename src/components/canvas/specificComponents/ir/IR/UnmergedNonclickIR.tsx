import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch } from "react-redux";
import { setComponent } from "redux/pagesReducer";
import store from "redux/store";
import { IRButton } from "./IRButton";
import { IRSubButton } from "./IRButton/IRSubButton";
import { IRInput } from "./IRInput";

export function UnmergedNonclickIR(props: any) {
    const dispatch = useDispatch();

    const dragInputEnd = (e: any, data: DraggableData) => {
        const {x, y} = data;
        const newComponent = JSON.parse(JSON.stringify(props.source));
        newComponent.inputX = x;
        newComponent.inputY = y;
        dispatch(setComponent({pageKey: props.pageKey, componentKey: props.componentKey, component: newComponent}));
    }

    const dragButtonEnd = (e: any, data: DraggableData) => {
        const {x, y} = data;
        const newComponent = JSON.parse(JSON.stringify(props.source));
        newComponent.buttonX = x;
        newComponent.buttonY = y;
        dispatch(setComponent({pageKey: props.pageKey, componentKey: props.componentKey, component: newComponent}));
    }
      
    console.log(Math.floor(props.source.buttonX * parseInt(props.source.style.width)));

    return <>
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
    </>
}