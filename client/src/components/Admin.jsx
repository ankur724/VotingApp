// /* eslint-disable no-unused-vars */
import { useState, useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const Admin = () => {
    const navigate = useNavigate(); 
    const [candidateData, setCandidateData] = useState({
        name: '',
        party: '',
        age: '',
    });
    const [candidates, setCandidates] = useState([]); // State to store list of candidates
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

    const fetchCandidates = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/candidate');

            setCandidates(response.data); // Assuming response.data contains the list of candidates
            // console.log(response.data)
        } catch (error) {
            console.error('Error fetching candidates:', error);
            toast.error('Failed to load candidates.');
        }
    }, []);

    useEffect(() => {
        fetchCandidates(); // Call fetchCandidates inside useEffect
    }, [fetchCandidates]); // Include fetchCandidates in the dependency array

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCandidateData({
            ...candidateData,
            [name]: value,
        });
    };

    const handleAddCandidate = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage

            if (!token) {
                toast.error('Unauthorized: No token found.');
                return;
            }

            const response = await axios.post(
                'http://localhost:3000/candidate',
                candidateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(candidateData)

            if (response.status === 200) {
                toast.success('Candidate added successfully!');
                setCandidateData({ name: '', party: '', age: '' });
                console.log(candidateData);
                fetchCandidates(); // Fetch updated list of candidates
            } else {
                toast.error('Failed to add candidate. Please try again.');
            }
        } catch (error) {
            console.error('Error adding candidate:', error);
            toast.error('Error occurred while adding candidate.');
        } finally {
            setIsSubmitting(false);
        }
    };
      
    const handleRemoveCandidate = (candidateId) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Are you sure you want to remove this candidate?</p>
                    <button 
                        onClick={() => {
                            removeCandidate(candidateId);
                            closeToast();
                        }}
                        style={{ marginRight: '10px' }}
                    >
                        Yes
                    </button>
                    <button onClick={closeToast}>No</button>
                </div>
            ),
            { autoClose: false } // Prevent the toast from auto-closing
        );
    };
    
    const removeCandidate = async (candidateId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Unauthorized: No token found.');
                return;
            }
    
            const response = await axios.delete(
                `http://localhost:3000/candidate/${candidateId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 200) {
                toast.success('Candidate removed successfully!');
                fetchCandidates(); // Refresh the list of candidates
            } else {
                toast.error('Failed to remove candidate. Please try again.');
            }
        } catch (error) {
            console.error('Error removing candidate:', error);
            toast.error('Error occurred while removing candidate.');
        }
    };
    // Hook for navigation

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        toast.success('Logged out successfully!');
        navigate('/login'); // Redirect to the login page
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const confirmLogout = window.confirm('You will be logged out if you go back. Are you sure?');
            if (confirmLogout) {
                handleLogout();
            } else {
                event.preventDefault();
                navigate(1); // Navigate forward if the user cancels the logout
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handleBeforeUnload);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    return (
        <main style={mainStyle}>
            <div style={rightContainerStyle}>
                <h2 style={subtitleStyle}>Hey🤟 Admin !</h2>
                <div style={buttonContainerStyle}>
                    {/* <h1 style={titleStyle}>List of the Candidate Register</h1> */}
                    {/* <Button style={{ backgroundColor: 'red', position: 'absolute', top: 0, right: 0, margin: '10px' }} text="LOGOUT" /> */}
                    <Button 
                        style={{ backgroundColor: 'red', position: 'absolute', top: 0, right: 0, margin: '10px' }} 
                        text="LOGOUT" 
                        onClick={handleLogout} 
                    />
                    <Button style={{ backgroundColor: 'green', position: 'absolute', top: 0, right: '8rem', margin: '10px' }} text="LEADERBOARD" />
                </div>

                <h3>Add New Candidate</h3>
                <div style={{ margin: '20px 0' }}>
                    <input
                        type="text"
                        name="name"
                        value={candidateData.name}
                        onChange={handleInputChange}
                        placeholder="Enter candidate name"
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        name="party"
                        value={candidateData.party}
                        onChange={handleInputChange}
                        placeholder="Enter candidate party"
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        name="age"
                        value={candidateData.age}
                        onChange={handleInputChange}
                        placeholder="Enter candidate age"
                        style={inputStyle}
                    />
                    <Button
                        style={{ backgroundColor: isSubmitting ? 'grey' : 'Green' }} 
                        text={isSubmitting ? 'Submitting...' : 'ADD CANDIDATE'} 
                        onClick={handleAddCandidate} 
                        disabled={isSubmitting} // Disable button while submitting
                    />
                </div>

                <h3>Registered Candidates</h3>
                <ul>
                    {candidates.map((candidate) => (
                        <li key={candidate._id}>
                            {candidate.name} - {candidate.party} - {candidate.age}
                            {/* <Button 
                                style={{ backgroundColor: 'red', marginLeft: '10px' }} 
                                text="REMOVE" 
                                onClick={() => handleRemoveCandidate(candidate._id)} 
                            /> */}
                            <Button 
    style={{ backgroundColor: 'red', marginLeft: '10px' }} 
    text="REMOVE" 
    onClick={() => handleRemoveCandidate(candidate._id)} 
/>
                        </li>
                    ))}
                </ul>

            </div>
        </main>
    );
};


const mainStyle = {
   
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', 
    backgroundColor: 'black',
    color: 'white',
    width: 'auto',  // Takes up 80% of the width
    height: '100vh' // Takes up 80% of the viewport height
};

// const titleStyle = {
//     fontSize: '2rem',
//     marginBottom: '10px',
//     fontFamily: '"Gupter", serif',  // Corrected the property name and value
//     fontWeight: 700,  // Corrected camelCase property name
//     fontStyle: 'normal', 

// };
const inputStyle = { margin: '5px 0', padding: '10px', width: '100%', maxWidth: '300px' };

const rightContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 50px',
};



const subtitleStyle = {
    fontSize: '4rem',
    color: '#2f89fc',
   
    fontFamily: '"Gupter", serif',  
    fontWeight: 700,  
    fontStyle: 'normal',  
    // marginBottom: '20px',
};

const buttonContainerStyle = {
    display: 'flex',
    gap: '20px',
};

// const imageStyle = {
//     maxWidth: '80%',
// };

export default Admin;
