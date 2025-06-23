import React from 'react';
import '../../css/Login.css';

const LoginLayout = ({ children }) => {
    return (
        <div className="page-wrapper">
            <div className="login-card">{children}</div>
        </div>
    );
};

export default LoginLayout;
