import { useState } from "react";
export default function Profile({ name, profession, yearsOfExperience, isAvailable }) {

    const [clicked, setClicked] = useState(0);
    const [clickedContact, setClickedContact] = useState('');
    function handleClick() {
        setClicked((previousclicked) => previousclicked + 1);
        alert(`Viewing ${name}'s profile`);
    }

    return (

        <div>
            <h2>{name} is a {profession}  with {yearsOfExperience} years of experience.</h2>
            <p> {isAvailable ? 'Available for work' : 'Not Available'}</p>
            <button onClick={handleClick}>viewed {clicked} {clicked === 1 ? 'time' : 'times'} </button>
            {isAvailable && <p><button onClick={() => setClickedContact(`Contacting ${name}`)}> Contact </button></p>}
            {clickedContact && <p>{clickedContact}</p>}

        </div>
    );
}