import React from 'react';

const Login = () => {
    const handleLogin = () => {
        // Redirect user to Spring Boot OAuth2 login URL
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Login</h2>
            <button onClick={handleLogin} style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer"
            }}>
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;