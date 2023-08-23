import React from "react";


const Masonry = (props) => {
  // eslint-disable-next-line react/prop-types
  const {items} = props;
  return (
    <>
      <div className="masonry-container">
        <div className="masonry">
          {/*{images.map((image, index) => (*/}
          {/*  <div key={index} className={`item item-${index + 1}`}>*/}
          {/*    <img src={image} alt={`Image ${index + 1}`} className="image"/>*/}
          {/*  </div>*/}
          {/*))}*/}
          {/* eslint-disable-next-line react/prop-types */}
          {items.map((item, index) => (
            <div key={index} className={`item item-${index + 1}`}>
              <img src={item.url} alt={`Image ${index + 1}`} className="image"/>
            </div>
          ))}
        </div>
      </div>
      {/*<div className="masonry-container mirrored">*/}
      {/*  <div className="masonry">*/}
      {/*    {images.slice(3, 5).map((image, index) => (*/}
      {/*      <div key={index} className={`item item-${index + 4}`}>*/}
      {/*        <img src={image} alt={`Image ${index + 4}`} className="image"/>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>

  );
};

export default Masonry;
