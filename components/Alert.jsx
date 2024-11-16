// src/components/Alert.jsx
import React from 'react';

const Alert = ({ message, type }) => {
    return (
        <div className={`alert alert-${type} mt-2`} role="alert">
            {message}
        </div>
    );
};

export default Alert;
