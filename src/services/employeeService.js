//const BASE_URL = "https://jsonplaceholder.typicode.com/users";
const BASE_URL = "http://localhost:8080/api/employees";
export async function getEmployees() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Failed to load employees.");
    }

    return await response.json();
}
export async function createEmployee(employee) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        throw new Error("Failed to add employee.");
    }

    return await response.json();
}

export async function updateEmployee(id, employee) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        throw new Error("Failed to edit employee.");
    }

    return await response.json();
}

export async function removeEmployee(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete employee.");
    }
}