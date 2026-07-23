export default function EmployeeCard({ employee, onDelete, onEdit, deleting }) {
    return (
        <div className="employee-card" >
            <div >
                <h3>{employee.name}</h3>
                <p>{employee.profession}</p>
            </div>
            <button onClick={() => onDelete(employee.id)} disabled={deleting}> {deleting ? "Deleting..." : "Delete"}</button>

            <button onClick={() => onEdit(employee)}>Edit</button>
        </div>
    );
}