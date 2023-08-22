import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Додайте імпорт prop-types

const Button = ({ content }) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  return (
    <button
      className={`custom-button ${isActive ? 'active' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {content}
    </button>
  );
};
Button.propTypes = {
  content: PropTypes.string.isRequired, // Додайте валідацію типу для пропса 'content'
};

export default Button;
