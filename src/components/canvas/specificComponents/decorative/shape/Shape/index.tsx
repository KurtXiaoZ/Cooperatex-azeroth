import RectImage from '../../../../../LeftMenu/thirdColumn/ThirdColumnDecorative/icons/rect.svg'


export function Circle(props: any) {
    return <svg width={props.source.style.width} height={props.source.style.height} fill-opacity={props.source.style.fillOpacity} viewBox={`0 0 76 76`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M72 38C72 19.2223 56.7777 4 38 4C19.2223 4 4 19.2223 4 38C4 56.7777 19.2223 72 38 72C56.7777 72 72 56.7777 72 38Z" 
            fill={props.source.style.fillColor} 
            stroke={props.source.style.strokeColor} 
            stroke-width={props.source.style.strokeWidth}
            stroke-opacity={props.source.style.strokeOpacity}
        />
    </svg>
}

export function Rect(props: any) {
    return <svg width={props.source.style.width} height={props.source.style.height} xmlns="http://www.w3.org/2000/svg">
        <rect 
            width={props.source.style.width} 
            height={props.source.style.height} 
            fill={props.source.style.fillColor}
            fill-opacity={props.source.style.fillOpacity}
            stroke={props.source.style.strokeColor} 
            stroke-width={props.source.style.strokeWidth}
            stroke-opacity={props.source.style.strokeOpacity}
        />
    </svg>
}

export function RoundRect(props: any) {
    return <svg width={props.source.style.width} height={props.source.style.height} xmlns="http://www.w3.org/2000/svg">
        <rect 
            width={props.source.style.width} 
            height={props.source.style.height} 
            fill={props.source.style.fillColor}
            fill-opacity={props.source.style.fillOpacity}
            stroke={props.source.style.strokeColor} 
            stroke-width={props.source.style.strokeWidth}
            stroke-opacity={props.source.style.strokeOpacity}
        />
    </svg>
    /*return <div style={{
        width: props.source.style.width,
        height: props.source.style.height,
        backgroundColor: props.source.style.fillColor,
        opacity: props.source.style.fillOpacity,
        //borderWidth: props.source.style.strokeWidth,
        boxShadow: `0px 0px 0px ${props.source.style.strokeWidth} ${}`
    }}></div>*/
}