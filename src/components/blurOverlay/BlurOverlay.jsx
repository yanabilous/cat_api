// BlurOverlay.jsx
import React from "react";


// eslint-disable-next-line react/prop-types
const BlurOverlay = ({ children }) => {
  return <div className="blur-overlay">{children}</div>;
};

export default BlurOverlay;
