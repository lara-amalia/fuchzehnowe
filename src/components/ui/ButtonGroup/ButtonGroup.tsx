import React from "react";
import "./ButtonGroup.css";

interface ButtonGroupProps {
  type: "suits" | "tricks";
  values: React.ReactNode[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ type, values }) => {
  const classes = `ButtonGroup ButtonGroup--${type}`;
  return (
    <div className={classes}>
      {values.map(value => (
        <button className="ButtonGroup-item">{value}</button>
      ))}
    </div>
  );
};

export default ButtonGroup;
