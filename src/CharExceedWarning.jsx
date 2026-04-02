import React from "react";
import './CharExceedWarning.css'
export default function CharExceedWarning() {
    const [text, setText] = React.useState('');
    const [showRed, setshowRed] = React.useState(false);
    function countChar(e) {
        const value = e.target.value
        setText(value);

        if (value.length > 10)
            setshowRed(true);
        else
            setshowRed(false);


    }
    return (

        <div>
            <p><label htmlFor="w3review">Type something:</label></p>
            <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={countChar} className={showRed ? 'textarea-error' : ''} value={text}></textarea>
            <p>Length : {text.length}</p>
        </div>
    );
}