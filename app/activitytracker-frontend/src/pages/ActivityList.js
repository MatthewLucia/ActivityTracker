// pages/ActivityList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActivityDetailsDropdown from "../components/ActivityDetailsDropdown";

function ActivityList() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/v1/activity', {
            credentials: "include"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched activities:", data);
                setActivities(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching activities data:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading activities...</div>;

    if (error) return <div className="alert alert-danger">Error loading activities: {error}</div>;

    return (
        <div className="activities-page">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Activities</h2>
                <Link to="/addActivity" className="btn btn-primary">
                    Add New Activity
                </Link>
            </div>

            {activities.length === 0 ? (
                <div className="alert alert-info">No activities found</div>
            ) : (
                <ul className="list-group">
                    {activities.map((activityData, index) => {
                        const activityId = activityData.activity.id;

                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={activityId || index}>
                                <div>
                                    <strong>{activityData.activity.name}</strong>
                                    <span className="badge bg-secondary ms-2">{activityData.type}</span>
                                </div>
                                <ActivityDetailsDropdown activityId={activityId} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default ActivityList;