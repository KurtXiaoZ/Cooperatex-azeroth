import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./index.less";
import Button from "../Button";
import { uploadImage } from "services/past";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Croppers = ({ onClose, defaultImage }: any) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState(defaultImage);
  const [cropper, setCropper] = useState<any>();

  const onChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation()
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      uploadImage({ uri: cropper.getCroppedCanvas().toDataURL(), }).then((resData: any) => {
        if (resData) {
          // console.log('----------- resData.uri:', resData.uri)
          // setCropData(`https://reachplatform.s3.us-east-2.amazonaws.com/${resData.uri}`);
          onClose && onClose(`https://reachplatform.s3.us-east-2.amazonaws.com/${resData.uri}`)
        }
      })
    }
  };

  return (
    <div style={{ height: "80%", width: "100%" }}>
      <div style={{ width: "100%" }}>
        <input type="file" id="image" name="file" onChange={onChange} />
        {cropData ? <img style={{ width: "80%", height: '60%' }} src={cropData} alt="cropped" /> : <Cropper
          style={{ height: "60%", width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance: any) => {
            setCropper(instance);
          }}
          guides={true}
        />}
      </div>
      <div className="modal-footer">
        <Button type="primiry" onClick={getCropData}>Done</Button>
      </div>
    </div>
  );
};

export default Croppers;
