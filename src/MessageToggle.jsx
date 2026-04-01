import React from "react";
export default function ToggleMessage() {


    const [showMessage, setShowMessage] = React.useState(false);
    function handleToggle() {
        setShowMessage(!showMessage)
    }
    return (

        <div>
            <h4>Eeshoye inu ettayk syntharel joli thanu sahayikko please</h4 >
            <button type="button" onClick={handleToggle}>Toggle me</button>
            <p>{showMessage ? "May God Bless you" : ''}</p>
        </div>

    );

}