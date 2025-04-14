// layouts/MainLayout.js
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../styles/MainLayout.css';

const MainLayout = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <div className="container">
                    <h1>Activity Tracker</h1>
                    <nav className="main-nav">
                        <ul>
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/activities" className={({ isActive }) => isActive ? 'active' : ''}>
                                    Activities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/addActivity" className={({ isActive }) => isActive ? 'active' : ''}>
                                    Add Activity
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="app-main">
                <div className="container">
                    <Outlet />
                </div>
            </main>

            <footer className="app-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Activity Tracker App</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;