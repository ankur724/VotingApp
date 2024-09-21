// src/components/MainSection.jsx
// import React from 'react';


// src/components/MainSection.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const MainSection = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        console.log('Register button clicked');
      navigate('/register');
    };
    const handleLogin = () => {
      navigate('/login');
    };

    return (
        <main style={mainStyle}>
            <div style={leftContainerStyle}>
                <img src="/Header.png" alt="Let's Vote" style={imageStyle} />
            </div>
            <div style={rightContainerStyle}>
                <h1 style={titleStyle}>Be a part of decision</h1>
                <h2 style={subtitleStyle}>Vote Today</h2>
                <div style={buttonContainerStyle}>
                    <Button text="REGISTER" onClick={handleRegister} />
                    <Button text="LOGIN" onClick={handleLogin} />
                </div>
            </div>
        </main>
    );
};

// ... other styles remain the same

// export default MainSection;


// const mainStyle = {
//     display: 'flex',
//     backgroundColor: 'black',
//     color: 'white',
//     height: '100vh',
// };
const mainStyle = {

    display: 'flex',
    backgroundColor: 'black',
    color: 'white',
    width: 'auto',  // Takes up 80% of the width
    height: '84vh' // Takes up 80% of the viewport height
};

const leftContainerStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const rightContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 50px',
};

const titleStyle = {
    fontSize: '2rem',
    marginBottom: '10px',
    fontFamily: '"Gupter", serif',  // Corrected the property name and value
    fontWeight: 700,  // Corrected camelCase property name
    fontStyle: 'normal', 

};

const subtitleStyle = {
    fontSize: '5rem',
    color: '#2f89fc',
    fontFamily: '"Gupter", serif',  
    fontWeight: 700,  
    fontStyle: 'normal',  
    marginBottom: '20px',
};

const buttonContainerStyle = {
    display: 'flex',
    gap: '20px',
};

const imageStyle = {
    maxWidth: '80%',
};

export default MainSection;
