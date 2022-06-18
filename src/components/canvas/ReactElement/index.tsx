import React from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "redux/store";
import { typeToComponent } from "../specificComponents";

/**
 * This is the generic template for creating any element in the canvas area.
 * First, pass an object describing the element to be created to ReactElement. Then, ReactElement renders the element based on the object.
 * 
 * @props source   the source for rendering the element
 * 
 * @returns the newly created element 
 */
export function ReactElement(props: any) {
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[state.rightMenu.selectedFrontEnd]);
    let mainPageKeys = useSelector((state: RootState) => state.frontends[frontendKey].pages.mainPageKeys);
    return typeToComponent(props.pageKey, props.componentKey, props.source, props.nodeRef, props.type, frontendKey, props.canvasRef);
}