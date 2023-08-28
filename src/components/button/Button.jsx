import React, {useState} from "react";
import PropTypes from "prop-types";

const Button = ({content, padding, icon, onClick=()=>{}}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };
  const buttonStyles = {
    padding: padding
  };


  return (
    <button
      onClick={onClick}
      className={`custom-button ${isActive ? "active" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={buttonStyles}
    >
      {content && !icon && content}
      {icon && !content && icon}
      {content && icon && (
        <>
          {content}
          {icon}
        </>
      )}

    </button>
  );
};
Button.propTypes = {
  content: PropTypes.string,
  icon: PropTypes.element,
  padding: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
