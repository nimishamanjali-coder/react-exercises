import { useState, useEffect } from "react";
import './Profile.css'
import EmployeeCard from "./EmployeeCard";


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

    // without useeffect
    // const [employees, setEmployees] = useState(
    //     [
    //         { id: 1, name: "Nimi", profession: "IT" },
    //         { id: 2, name: "Nay", profession: "AI" },
    //         { id: 3, name: "Der", profession: "ELEC" }
    //     ]


    // );
    //   A useful rule:

    // User clicks Add/Edit/Delete: call the backend in the handler.
    // Page loads and needs employee data: use useEffect.
    // A value changes and should automatically trigger backend work: useEffect may be appropriate, but avoid using it for actions that already have a clear event handler.
    const [employees, setEmployees] = useState(() => {
        const savedEmployees = localStorage.getItem("employees");
        return savedEmployees ? JSON.parse(savedEmployees) : [
            { id: 1, name: "Nimi", profession: "IT" },
            { id: 2, name: "Nay", profession: "AI" },
            { id: 3, name: "Der", profession: "ELEC" }
        ];
    });
    const [newName, setNewName] = useState("");
    const [newProfession, setNewProfession] = useState("");
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editProfession, setEditProfession] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");
    const [addingEmployee, setAddingEmployee] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(false);
    const [deletingId, setDeletingId] = useState(null);


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
    async function handleEdit(event) {
        event.preventDefault();
        if (editName.trim() === "" || editProfession.trim() === "") {
            return;
        }
        try {
            setLoadError("");
            setEditingEmployee(true);
            const updatedEmployee = await editEmployeeBackend(editingId, { name: editName, profession: editProfession })
            setEmployees((prevEmp) => prevEmp.map((emp) => emp.id === editingId ? {
                ...emp,
                name: updatedEmployee.name,
                profession: updatedEmployee.profession
            } : emp));
            cancelEditing();
        } catch (error) { setLoadError(error.message); } finally { setEditingEmployee(false); }


    }

    async function editEmployeeBackend(id, employee) {


        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(employee),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error("Failed to edit employee");
        }


        return await response.json();
    }

    function addEmployee(nname, nprofession) {

        setEmployees((prevEmp) => [...prevEmp, { id: Date.now(), name: nname, profession: nprofession }]);
        setNewName(''); setNewProfession('');

    }
    async function addEmployeeBackend(nname, nprofession) {


        try {

            const savedEmployee = await addEmployeeToBackend({
                name: nname,
                profession: nprofession,
            });
            setEmployees((prevEmp) => [...prevEmp, savedEmployee]);
            setNewName(''); setNewProfession('');
        } catch (error) {
            setError(error.message);
        } finally {
            setAddingEmployee(false);
        }



    }
    async function deleteEmployeeBackend(id) {

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error("Failed to delete employee.");
        }


    }
    async function deleteEmployee(id) {
        setLoadError('');
        setDeletingId(id);
        try {
            await deleteEmployeeBackend(id);
            setEmployees((previousEmp => previousEmp.filter((emp) => emp.id !== id)));
        } catch (error) { setLoadError(error.message); } finally { setDeletingId(null); }

    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (newName.trim() === '' || newProfession.trim() === '') {
            setError('Please enter both name and profession.');
            return;
        }

        setLoadError('');
        setAddingEmployee(true);
        //addEmployee(newName, newProfession);
        await addEmployeeBackend(newName, newProfession);
    }

    //     A useful rule:

    // Use state for values that change through user actions or events.
    // Use a normal variable for values that can be calculated from props or state.

    // filteredEmployees is called derived data because it is derived from employees and searchTerm.
    const filteredEmployees = employees.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()));


    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);


    function simulateLoading() {
        setLoading(true);
        setLoadError("");
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }
    function simulateError() {
        setLoading(true);
        setLoadError("");

        setTimeout(() => {
            setLoading(false);
            setLoadError("Failed to load employees.");
        }, 2000);
    }

    useEffect(() => {
        async function loadEmployees() {
            setLoading(true);
            setLoadError("");
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!response.ok) {
                    throw new Error("Failed to load employees.");
                }
                const data = await response.json();
                const convertedEmployees = data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    profession: user.company.name
                }));
                setEmployees(convertedEmployees);
            }
            catch (error) {
                setLoadError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadEmployees();
    }, []);


    async function addEmployeeToBackend(employee) {

        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),

        });
        if (!response.ok) {
            throw new Error("Failed to add employee.")
        }

        return await response.json();
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


            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employees"></input>

            {filteredEmployees.length === 0 ? (<p>No employees found.</p>) : (filteredEmployees.map((emp) =>
                <EmployeeCard key={emp.id} employee={emp} onDelete={deleteEmployee} onEdit={startEditing} deleting={deletingId === emp.id} ></EmployeeCard>
            ))}

            {editingId && <p>Editing employee ID: {editingId}</p>}
            {/* how to add with add button */}
            {/* <div>
                <input value={newName} onChange={(event) => setNewName
                    (event.target.value)}></input>
                <input value={newProfession} onChange={(event) => setNewProfession(event.target.value)}></input>
                <button onClick={() => addEmployee(newName, newProfession)}>ADD</button>
            </div> */}

            {/* add form */}
            <form onSubmit={handleSubmit}>
                <input value={newName} onChange={(event) => setNewName
                    (event.target.value)}></input>
                <input value={newProfession} onChange={(event) => setNewProfession(event.target.value)}></input>
                <button type="submit" disabled={addingEmployee}> {addingEmployee ? "Adding..." : "Add"}</button>
                {error && <p>{error}</p>}
            </form>

            {
                editingId &&
                <form onSubmit={handleEdit}>
                    <input value={editName} onChange={(event) => setEditName(event.target.value)} ></input>
                    <input value={editProfession} onChange={(event) => setEditProfession(event.target.value)} ></input>
                    <button type="submit" disabled={editingEmployee}>{editingEmployee ? 'Saving' : 'Save'}</button>
                    <button type="button" onClick={cancelEditing}>
                        Cancel
                    </button>
                </form>
            }

            <button onClick={simulateLoading}>Simulate loading</button>

            <button onClick={simulateError}>Simulate error</button>
            {loading && <p>Loading employees...</p>}
            {loadError && <p>{loadError}</p>}
        </div >
    );
}