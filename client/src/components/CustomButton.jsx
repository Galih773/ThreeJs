/* eslint-disable react/prop-types */
import React from "react";
import { useSnapshot } from "valtio";

import state from "../store";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({
  type,
  title = "",
  customStyles,
  handleClick,
  icon = null,
}) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {icon && React.cloneElement(icon, { className: "w-6 h-6" })}
      {title}
    </button>
  );
};

export default CustomButton;
