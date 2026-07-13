import React from "react";
import "./SwitchToggle.css";

export default function SwitchToggle() {
  const [showColor, setshowColor] = React.useState(false);
  function toggle() {
    setshowColor(!showColor);
  }
  return (
    <div className={showColor ? "light" : "dark"}>
      <h2>{!showColor ? "Dark Mode 🌙" : "Light Mode ☀️"}</h2>
      <button type="submit" onClick={toggle}>
        Switch
      </button>
    </div>
  );
}
