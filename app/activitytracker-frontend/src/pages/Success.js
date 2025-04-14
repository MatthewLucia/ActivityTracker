import React, { useEffect, useState } from 'react';

const Success = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/userinfo", {
            credentials: "include"  // Ensures cookies/session are sent
        })
            .then(res => res.json())
            .then(data => setUserInfo(data));
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Welcome!</h2>
            {userInfo ? (
                <div>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <img src={userInfo.picture} alt="profile" />
                </div>
            ) : (
                <p>Loading user info...</p>
            )}
        </div>
    );
};

export default Success;