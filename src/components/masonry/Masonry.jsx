import React from "react";


const Masonry = (props) => {
  // eslint-disable-next-line react/prop-types
  const {items} = props;
  return (
    <>
      <div className="masonry-container">
        <div className="masonry">
          {/* eslint-disable-next-line react/prop-types */}
          {items.map((item, index) => (
            <div key={index} className={`item item-${index + 1}`}>
              <img src={item.url} alt={`Image ${index + 1}`} className="image"/>
            </div>
          ))}
        </div>
      </div>
    </>

  );
};

export default Masonry;
