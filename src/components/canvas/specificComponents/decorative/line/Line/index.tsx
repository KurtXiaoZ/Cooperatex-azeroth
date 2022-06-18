export function Line(props: any) {
    return <svg width={props.source.style.width} height='2' fill="none" opacity={props.source.style.opacity} xmlns="http://www.w3.org/2000/svg" ref={props.nodeRef}>
    <line x1={0} x2={props.source.style.width} y1='1' y2='1' stroke={props.source.style.backgroundColor}  stroke-width='2' stroke-linecap="square"/>
    </svg>
}

export function DashLine(props: any) {
    return <svg width={props.source.style.width} height='2' fill="none" opacity={props.source.style.opacity} xmlns="http://www.w3.org/2000/svg" ref={props.nodeRef}>
        <line x1={0} x2={props.source.style.width} y1='1' y2='1' stroke={props.source.style.backgroundColor}  stroke-width='2' stroke-linecap="square" stroke-dasharray="4 4"/>
    </svg>
}

export function DotLine(props: any) {
    return <svg width={props.source.style.width} height='2' fill="none" opacity={props.source.style.opacity} xmlns="http://www.w3.org/2000/svg" ref={props.nodeRef}>
        <line x1={0} x2={props.source.style.width} y1='1' y2='1' stroke={props.source.style.backgroundColor}  stroke-width='3' stroke-linecap="round" stroke-dasharray="4, 4"/>
    </svg>
}

export function ArrowLine(props: any) {
    return <svg width={props.source.style.width} height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="Triangle" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <line x1={0} x2={props.source.style.width - 10} y1='1' y2='1' stroke={props.source.style.backgroundColor}  stroke-width='2' stroke-linecap="square" markerEnd="url(#Triangle)"/>
    </svg>
}

