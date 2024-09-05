import React from 'react';
import './styles.scss';

interface LoadingOverlayProps {
    isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="loading-overlay" data-testid="loading-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingOverlay;
