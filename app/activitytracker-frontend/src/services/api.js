// services/api.js
const API_BASE_URL = 'http://localhost:8080/api/v1';

export const fetchActivities = async () => {
    const response = await fetch(`${API_BASE_URL}/activity`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

export const fetchActivityById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/activity/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

export const createActivity = async (activityData) => {
    const response = await fetch(`${API_BASE_URL}/activity`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

export const updateActivity = async (id, activityData) => {
    const response = await fetch(`${API_BASE_URL}/activity/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

export const deleteActivity = async (id) => {
    const response = await fetch(`${API_BASE_URL}/activity/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
};