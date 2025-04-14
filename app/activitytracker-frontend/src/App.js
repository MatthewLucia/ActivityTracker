import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout component
import MainLayout from './layouts/MainLayout';

// Page components
import ActivityList from './pages/ActivityList';
import AddActivity from './pages/AddActivity';
import Home from './pages/Home';
import UserList from './pages/UserList'; // Import UserList

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="activities" element={<ActivityList />} />
                    <Route path="addActivity" element={<AddActivity />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;