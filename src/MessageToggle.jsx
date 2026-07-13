import React from "react";

// 1. Button → Message Toggle

// Goal: Practice state & instant feedback
// 👉 Build:

// A button “Show message”
// When clicked → show/hide a text

export default function ToggleMessage() {


    const [showMessage, setShowMessage] = React.useState(false);
    function handleToggle() {
        setShowMessage(!showMessage)
    }
    return (

        <div>
            <h4>Eeshoye ettayk syntharel joli thanu sahayichenu orupaad nanni parayunu</h4 >
            <button type="button" onClick={handleToggle}>Toggle me</button>
            <p>{showMessage ? "May God Bless you" : ''}</p>
        </div>

    );

}