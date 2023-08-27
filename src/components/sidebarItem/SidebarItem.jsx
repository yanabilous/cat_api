import React from 'react';
import PropTypes from 'prop-types';

const SidebarItem = ({ backgroundColor, src }) => {

  return (
    <div
      className="headerItem"
      style={{ backgroundColor }}
    >
      <img src={src} alt={src}/>
    </div>
  );
};
SidebarItem.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default SidebarItem;
