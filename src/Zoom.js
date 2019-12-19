import React from "react";
import { cropImage } from "./math/coordinates";

const Zoom = ({ source, imgRef, positions }) => (
  <div className="zoom-container">
    <img
      src={source}
      alt="realimage"
      style={cropImage(imgRef.current, positions)}
    />
  </div>
);

export default React.memo(Zoom);
