/**
 * Determines if the current location is located within the canvas.
 * 
 * @param curLeft 'left' of current location
 * @param curTop 'right' of current location
 * @returns TRUE if the location is within the canvas
 */
 export const withinCanvas = (curLeft: any, curTop: any) => {
    let canvasContent = document.getElementsByClassName("canvas-container")[0];
    const getElementLeft = (element: any) => {
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent
        while (current !== null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }
    const getElementTop = (element: any) => {
        let actualTop = element.offsetTop;
        let current = element.offsetParent
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }
    let canvasLeft = getElementLeft(canvasContent);
    let canvasTop = getElementTop(canvasContent);
    return (curLeft > canvasLeft && curLeft < canvasLeft + canvasContent.clientWidth && curTop > canvasTop && curTop < canvasTop + canvasContent.clientHeight)
}

