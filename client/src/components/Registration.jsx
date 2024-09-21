// src/components/Registration.jsx
// import React from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const notify = () => toast("Wow Registration succesfull !");
const Registration = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: e.target.name.value,
            age: e.target.age.value,
            mobile: e.target.mobile.value,
            email: e.target.email.value,
            address: e.target.address.value,
            aadharCardNumber: e.target.aadharCardNumber.value,
            password: e.target.password.value,
            role: e.target.role.value, // Get the selected role
        };

        console.log('Form data:', formData);
        console.log(e.target.aadharCardNumber.value.length)
        try {
            const response = await axios.post('http://localhost:3000/user/signup', formData);
    
            if (response.status === 200 || response.status === 201) {
                console.log('User registered successfully');
                toast.success("Wow! Registration successful!");
            
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
                // notify();
            } else {
                console.log('Failed to register user from react side');
                toast.error("Failed to register user!");
            }
        } catch (error) {
            console.error('Error:', error);
            // Optionally, show an error message
            toast.error("An error occurred during registration.");
        }
    //     try {
    //         const response = await fetch('http://localhost:3000/user/signup', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         if (response.ok) {
    //             console.log('User registered successfully');
    //             // Optionally, show a success message or redirect
    //         } else {
    //             console.log('Failed to register user from react side');
    //             // Optionally, show an error message
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         // Optionally, show an error message
    //     }
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                <img src="Registration Page.png" alt="Person with Document" style={imageStyle} />
            </div>
            <div style={formContainerStyle}>
                <h2 style={titleStyle}>Registration Form</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" style={inputStyle} />
                    <input type="number" name="age" placeholder="Age" style={inputStyle} />
                    <input type="tel" name="mobile" placeholder="Mobile No." style={inputStyle} />
                    <input type="email" name="email" placeholder="Email" style={inputStyle} />
                    <input type="text" name="address" placeholder="Address" style={inputStyle} />
                    <input type="text" name="aadharCardNumber" placeholder="Aadhar Number" style={inputStyle} />
                    <input type="password" name="password" placeholder="Password" style={inputStyle} />
                    <input type="password" placeholder="Re-enter Password" style={inputStyle} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <input type='radio' name="role" value="voter" defaultChecked />
                            <label style={{ marginLeft: '5px' }}>Voter</label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type='radio' name="role" value="admin" />
                            <label style={{ marginLeft: '5px' }}>Admin</label>
                        </div>
                    </div>

                    <button type="submit" style={submitButtonStyle}>Submit</button>
         
                </form>
            </div>
        </div>
    );
};
const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#0b1120',
};

const imageContainerStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const imageStyle = {
    width: '60%',
};

const formContainerStyle = {
    flex: 1,
    padding: '20px',
    color: '#fff',
};

const titleStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const submitButtonStyle = {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#2f89fc',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default Registration;
