import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { formatDuration } from '../utils/utils';

const ActivityDetailsDropdown = ({ activityId }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
        if (!details && !loading && !error) {
            fetchActivityDetails();
        }
    };

    const fetchActivityDetails = () => {
        if (!activityId) {
            console.error("No activity ID provided");
            setError("No activity ID provided");
            return;
        }

        setLoading(true);
        console.log(`Fetching details for activityId: ${activityId}`);

        // Log the full URL for debugging
        const url = `http://localhost:8080/api/v1/activity/${activityId}`;
        console.log(`Fetching from URL: ${url}`);

        fetch(url)
            .then(response => {
                console.log(`Response status: ${response.status}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched activity details:', data);
                setDetails(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching activity details:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                More Details (ID: {activityId})
            </DropdownToggle>
            <DropdownMenu>
                {loading && <DropdownItem>Loading...</DropdownItem>}

                {error && (
                    <>
                        <DropdownItem>Error: {error}</DropdownItem>
                        <DropdownItem onClick={() => {setError(null); fetchActivityDetails();}}>
                            Retry
                        </DropdownItem>
                    </>
                )}

                {details && (
                    <>
                        <DropdownItem header>{details.activity.name} ({details.type})</DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem>
                            <strong>Description:</strong> {details.activity.description || 'N/A'}
                        </DropdownItem>

                        <DropdownItem>
                            <strong>Date:</strong> {details.activity.date || 'N/A'}
                        </DropdownItem>

                        <DropdownItem>
                            <strong>Duration:</strong> {details.activity.duration ? formatDuration(details.activity.duration) : 'N/A'}
                        </DropdownItem>

                        <DropdownItem>
                            <strong>Calories:</strong> {details.activity.calories || 'N/A'}
                        </DropdownItem>

                        {details.type === 'CardioActivity' && (
                            <>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <strong>Distance:</strong> {details.activity.distance || 0} miles
                                </DropdownItem>
                                <DropdownItem>
                                    <strong>Elevation Gain:</strong> {details.activity.elevationGain || 0} ft
                                </DropdownItem>
                            </>
                        )}

                        {details.type === 'StrengthActivity' && details.activity.exercises && (
                            <>
                                <DropdownItem divider />
                                <DropdownItem header>Exercises</DropdownItem>
                                {details.activity.exercises.map((exercise, index) => (
                                    <DropdownItem key={index} className="py-2">
                                        <div><strong>{exercise.type}</strong></div>
                                        <ul className="pl-3 mb-0 mt-1">
                                            {exercise.setDetails && exercise.setDetails.map((set, setIndex) => (
                                                <li key={setIndex} className="small">
                                                    {set.reps} reps @ {set.weight} lbs
                                                </li>
                                            ))}
                                        </ul>
                                    </DropdownItem>
                                ))}
                            </>
                        )}
                    </>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};

export default ActivityDetailsDropdown;