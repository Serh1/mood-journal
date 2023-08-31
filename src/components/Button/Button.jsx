import React from "react";
import "./Button.css";
import { useState } from "react";

const Button = ({ text, onSelectText }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onSelectText(text);
    console.log("Sa");
  };

  return (
    <section
      id="ButtonContainer"
      className={isClicked ? "clicked" : ""}
      onClick={handleClick}
    >
      {text}
    </section>
  );
};

export default Button;
