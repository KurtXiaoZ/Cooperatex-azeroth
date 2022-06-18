import { useEffect, useRef, useState } from "react";

export function CustomImage(props: any) {
    const fileSelector: any = useRef();

    const [imageSource, setImageSource] = useState("");

    useEffect(() => {
        fileSelector.current.click();
    }, []);

    const handleImage = (e: any) => {
        setImageSource(window.URL.createObjectURL(e.target.files[0]));
    }

    return <>
        <input type="file" id="file" style={{display: 'none'}} ref={fileSelector} onChange={handleImage}/>
        {imageSource !== "" && <img 
            src={imageSource} 
            style={{
                height: props.source.style.height,
                width: props.source.style.width,
                opacity: props.source.style.opacity
            }}
            draggable="false"
        />}
    </>
}