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
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editProfession, setEditProfession] = useState('');

    function startEditing(emp) {
        setEditingId(emp.id);
        setEditName(emp.name);
        setEditProfession(emp.profession);
    }
    function cancelEditing() {
        setEditingId(null);
        setEditName("");
        setEditProfession("");
    }
    function handleEdit(event) {
        event.preventDefault();
        if (editName.trim() === "" || editProfession.trim() === "") {
            return;
        }

        setEmployees((prevEmp) => prevEmp.map((emp) => emp.id === editingId ? {
            ...emp,
            name: editName,
            profession: editProfession
        } : emp));
        cancelEditing();

    }

    function addEmployee(nname, nprofession) {

        setEmployees((prevEmp) => [...prevEmp, { id: Date.now(), name: nname, profession: nprofession }]);
        setNewName(''); setNewProfession('');

    }
    function deleteEmployee(id) {
        setEmployees((previousEmp => previousEmp.filter((emp) => emp.id !== id)));
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (newName.trim() === '' || newProfession.trim() === '') {
            setError('Please enter both name and profession.');
            return;
        }

        setError('');
        addEmployee(newName, newProfession);
    }

    //     A useful rule:

    // Use state for values that change through user actions or events.
    // Use a normal variable for values that can be calculated from props or state.

    // filteredEmployees is called derived data because it is derived from employees and searchTerm.
    const filteredEmployees = employees.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()));
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


            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employees"></input>

            {filteredEmployees.map((emp) =>
                <div className="employee-card" key={emp.id}>
                    <div >
                        <h3>{emp.name}</h3>
                        <p>{emp.profession}</p>
                    </div>
                    <button onClick={() => deleteEmployee(emp.id)}>Delete</button>

                    <button onClick={() => startEditing(emp)}>Edit</button>
                </div>)}
            {editingId && <p>Editing employee ID: {editingId}</p>}
            {/* how to add with add button */}
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
                <button type="submit">ADD</button>
                {error && <p>{error}</p>}
            </form>

            {editingId &&
                <form onSubmit={handleEdit}>
                    <input value={editName} onChange={(event) => setEditName(event.target.value)} ></input>
                    <input value={editProfession} onChange={(event) => setEditProfession(event.target.value)} ></input>
                    <button type="submit">Save</button>
                    <button type="button" onClick={cancelEditing}>
                        Cancel
                    </button>
                </form>
            }

        </div>
    );
}