import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/user')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="container">
            <h2>Activities</h2>
            <nav>
                <Link to="/" className="btn btn-primary">Home</Link>
                <Link to="/registerUser" className="btn btn-secondary">Register a New User</Link>
            </nav>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;