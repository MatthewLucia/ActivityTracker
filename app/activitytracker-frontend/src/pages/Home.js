// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <div className="jumbotron p-5 mb-4 bg-light rounded-3">
                <h1 className="display-4">Welcome to Activity Tracker</h1>
                <p className="lead">
                    Track your workouts, monitor your progress, and achieve your fitness goals.
                </p>
                <hr className="my-4" />
                <p>
                    Get started by viewing your activities or adding a new workout.
                </p>
                <div className="mt-4">
                    <Link to="/activities" className="btn btn-primary btn-lg me-3">
                        View Activities
                    </Link>
                    <Link to="/addActivity" className="btn btn-secondary btn-lg">
                        Add New Activity
                    </Link>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Cardio Workouts</h5>
                            <p className="card-text">Track your runs, bike rides, swims, and other cardio activities.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Strength Training</h5>
                            <p className="card-text">Log your weight training sessions with detailed exercise information.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Progress Tracking</h5>
                            <p className="card-text">Monitor your improvements over time with detailed statistics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;