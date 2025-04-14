// pages/AddActivity.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddActivity = () => {
    const navigate = useNavigate();
    const [activityType, setActivityType] = useState('CardioActivity');
    const [formData, setFormData] = useState({
        name: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        duration: 30,
        calories: 0,
        // Cardio-specific fields
        distance: 0,
        elevationGain: 0,
        // Strength-specific fields
        exercises: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTypeChange = (e) => {
        setActivityType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Create activity object based on type
        const activityData = {
            name: formData.name,
            date: formData.date,
            description: formData.description,
            duration: {
                seconds: formData.duration * 60
            },
            calories: parseInt(formData.calories)
        };

        if (activityType === 'CardioActivity') {
            activityData.distance = parseFloat(formData.distance);
            activityData.elevationGain = parseInt(formData.elevationGain);
        } else {
            activityData.exercises = formData.exercises;
        }

        // Send to API
        fetch('http://localhost:8080/api/v1/activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activityData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create activity');
                }
                return response.json();
            })
            .then(() => {
                setLoading(false);
                navigate('/activities');
            })
            .catch(error => {
                console.error('Error creating activity:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="add-activity-page">
            <h2 className="mb-4">Add New Activity</h2>

            {error && (
                <div className="alert alert-danger mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="activityType" className="form-label">Activity Type</label>
                    <select
                        id="activityType"
                        className="form-select"
                        value={activityType}
                        onChange={handleTypeChange}
                    >
                        <option value="CardioActivity">Cardio</option>
                        <option value="StrengthActivity">Strength Training</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Activity Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="calories" className="form-label">Calories Burned</label>
                    <input
                        type="number"
                        className="form-control"
                        id="calories"
                        name="calories"
                        value={formData.calories}
                        onChange={handleInputChange}
                        min="0"
                    />
                </div>

                {activityType === 'CardioActivity' && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="distance" className="form-label">Distance (miles)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="distance"
                                name="distance"
                                value={formData.distance}
                                onChange={handleInputChange}
                                min="0"
                                step="0.1"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="elevationGain" className="form-label">Elevation Gain (ft)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="elevationGain"
                                name="elevationGain"
                                value={formData.elevationGain}
                                onChange={handleInputChange}
                                min="0"
                            />
                        </div>
                    </>
                )}

                {activityType === 'StrengthActivity' && (
                    <div className="mb-3">
                        <p className="form-label">Exercises</p>
                        <p className="text-muted">Exercise functionality would be implemented here</p>
                        {/* Exercise input would be added here in a production app */}
                    </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/activities')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Activity'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddActivity;