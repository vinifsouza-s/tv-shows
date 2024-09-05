// components/atoms/Button.tsx
import React from 'react';
import './styles.scss';

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    disabled = false,
    type = 'button',
    variant = 'secondary',
    children,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`btn ${variant} ${disabled ? 'disabled' : ''}`}
        >
            {children}
        </button>
    );
};

export default Button;
