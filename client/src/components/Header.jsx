// src/components/Header.jsx
// import React from 'react';

const Header = () => {
    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li style={liStyle}><a href="#about" style={aStyle}>About</a></li>
                    <li style={liStyle}><a href="/login" style={{...aStyle, ...loginStyle}}>Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

// const headerStyle = {
//     padding: '20px',
//     backgroundColor: 'black',
//     display: 'flex',
//     justifyContent: 'flex-end',
// };
const headerStyle = {
    padding: '20px',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'auto', // Takes up the full width
    height: '12vh' // Takes up 20% of the viewport height
};

const navStyle = {
    display: 'flex',
};

const ulStyle = {
    listStyleType: 'none',
    display: 'flex',
    gap: '20px',
};

const liStyle = {
    display: 'inline',
};

const aStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
};

const loginStyle = {
    color: '#2f89fc',
};

export default Header;
