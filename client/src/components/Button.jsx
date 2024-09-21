// src/components/Button.jsx
// import React from 'react';

// eslint-disable-next-line react/prop-types
const Button = ({ text, onClick, style }) => {
    return (
        <button style={{ ...buttonStyle, ...style }} onClick={onClick}>
            {text}
        </button>
    );
};

const buttonStyle = {
    backgroundColor: '#2f89fc', // Default color
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '50px',
};

export default Button;
