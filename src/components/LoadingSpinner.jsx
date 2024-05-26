import React from 'react';
import './Spinner.css'

const LoadingSpinner = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingSpinner;