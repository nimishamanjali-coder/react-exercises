import { useState } from "react";
import './Profile.css'
export default function Profile({ name, profession, yearsOfExperience, isAvailable }) {

    const [clicked, setClicked] = useState(0);
    const [message, setMessage] = useState('');
    const [clickedContact, setClickedContact] = useState('');
    function handleClick() {
        setClicked((previousclicked) => previousclicked + 1);
        alert(`Viewing ${name}'s profile`);
    }
    const skills = ["Java", "React", "Spring Boot"];

    // const employees = [
    //     { id: 1, name: "Nimi", profession: "IT" },
    //     { id: 2, name: "Nay", profession: "AI" },
    //     { id: 3, name: "Der", profession: "ELEC" }
    // ]; // simple const variable will not change once defined. to make it dynamic, we add state

    const [employees, setEmployees] = useState(
        [
            { id: 1, name: "Nimi", profession: "IT" },
            { id: 2, name: "Nay", profession: "AI" },
            { id: 3, name: "Der", profession: "ELEC" }
        ]


    );
    const [newName, setNewName] = useState("");
    const [newProfession, setNewProfession] = useState("");

    function addEmployee(nname, nprofession) {
        if (nname.trim() === '' || nprofession.trim() === '')
            return;
        setEmployees((prevEmp) => [...prevEmp, { id: Date.now(), name: nname, profession: nprofession }]);
        setNewName(''); setNewProfession('');

    }
    function deleteEmployee(id) {
        setEmployees((previousEmp => previousEmp.filter((emp) => emp.id !== id)));
    }
    function handleSubmit(event) {
        event.preventDefault();

        addEmployee(newName, newProfession);
    }
    return (

        <div>
            <h2>{name} is a {profession}  with {yearsOfExperience} years of experience.</h2>
            <p> {isAvailable ? 'Available for work' : 'Not Available'}</p>
            <button onClick={handleClick}>viewed {clicked} {clicked === 1 ? 'time' : 'times'} </button>
            {isAvailable && <p><button onClick={() => setClickedContact(`Contacting ${name}`)}> Contact </button></p>}
            {clickedContact && <p>{clickedContact}</p>}
            <input value={message} onChange={(event) => setMessage(event.target.value)}></input>
            {message && <p>Message : {message}</p>}

            <ul>
                {skills.map(i => <li key={i}>{i}</li>)}
            </ul>

            {employees.map((emp) =>
                <div className="employee-card" key={emp.id}>
                    <div >
                        <h3>{emp.name}</h3>
                        <p>{emp.profession}</p>
                    </div>
                    <button onClick={() => deleteEmployee(emp.id)}>Delete</button>

                </div>)}

            {/* <div>
                <input value={newName} onChange={(event) => setNewName
                    (event.target.value)}></input>
                <input value={newProfession} onChange={(event) => setNewProfession(event.target.value)}></input>
                <button onClick={() => addEmployee(newName, newProfession)}>ADD</button>
            </div> */}

            <form onSubmit={handleSubmit}>
                <input value={newName} onChange={(event) => setNewName
                    (event.target.value)}></input>
                <input value={newProfession} onChange={(event) => setNewProfession(event.target.value)}></input>
                <button type="submit">Submit</button>
            </form>

        </div>
    );
}