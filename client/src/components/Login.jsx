import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';


const Login = () => {
    const [aadharCardNumber, setAadharCardNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                aadharCardNumber,
                password,
            });

            if (response.status === 200) {
                // Store the token (e.g., in local storage)
                localStorage.setItem('token', response.data.token);
                toast.success("Wow! Login successful!");

                // Fetch user profile details after successful login
                const token = response.data.token;
                const profileResponse = await axios.get('http://localhost:3000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userRole = profileResponse.data.user.role;

                // Redirect based on user role
                if (userRole === 'voter') {
                    navigate('/userprofile');
                } else if (userRole === 'admin') {
                    navigate('/admin');
                } else {
                    toast.error("Unknown role! Please contact support.");
                }
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                <img src="Login Page.png" alt="Person with Laptop" style={imageStyle} />
            </div>
            <div style={formContainerStyle}>
                <h2 style={titleStyle}>Login</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Aadhar Number"
                        value={aadharCardNumber}
                        onChange={(e) => setAadharCardNumber(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                    <div style={linkContainerStyle}>
                        <a href="#" style={linkStyle}>Forgot Password?</a>
                        <a href="/register" style={linkStyle}>Register now</a>
                    </div>
                    <button type="submit" style={submitButtonStyle}>Login</button>
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
    width: '70%',
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

const linkContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
};

const linkStyle = {
    color: '#2f89fc',
    textDecoration: 'none',
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

export default Login;

