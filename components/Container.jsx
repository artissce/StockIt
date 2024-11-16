// Container.jsx
import React from 'react';
import './Container.css';

const Container = ({ children }) => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" align='center' style={{ minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="custom-container">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Container;
