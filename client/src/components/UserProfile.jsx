import { useState, useEffect} from 'react';
import Button from './Button';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState({}); // Added to store user data (name, Aadhar number)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [hasVoted, setHasVoted] = useState(userData.isVoted);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        // Get the token from local storage
        const token = localStorage.getItem('token');

        if (token) {
            // Fetch the user's details using the token 
            axios.get('http://localhost:3000/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                // Set the username and other user data from the response
                const userName = response.data.user.name;
                setUsername(userName);
                console.log(username)

                // Store additional user data if needed
                setUserData({
                    name: userName,
                    aadharNumber: response.data.user.aadharCardNumber, 
                });
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
        }
    }, []);

    const handlePasswordChange = () => {
        // Handle the password change logic here (e.g., send a request to the server)
        console.log('New password:', newPassword);
        setModalIsOpen(false); // Close the modal after password change
    };
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

    useEffect(() => {
        // Fetch the list of candidates from the backend
        axios.get('http://localhost:3000/candidate')
            .then(response => {
                setCandidates(response.data);
                console.log(candidates)
            })
            .catch(error => {
                console.error('There was an error fetching the candidates!', error);
            });
    }, []);

    const handleVote = async (candidateId) => {
        if (hasVoted) {
            setErrorMessage("You have already voted.");
            return;
        }

        try {
            const response = await axios.get(`/api/vote/${candidateId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
     
            if (response.status === 200) {
                // Update the candidate's vote count locally
                const updatedCandidates = candidates.map(candidate => {
                    if (candidate._id === candidateId) {
                        return { 
                            ...candidate, 
                            voteCount: candidate.voteCount + 1 
                        };
                    }
                    return candidate;
                });
    
                setCandidates(updatedCandidates);
                setHasVoted(true); // Disable voting after vote is cast
            }
        } catch (error) {
            setErrorMessage(error,'Failed to cast vote. Please try again.');
        }
    };





    return (
        <main style={mainStyle}>
            <div style={rightContainerStyle}>
                <h1 style={titleStyle}>Hello, {username}!</h1>
                <div style={leftContainerStyle}>
                <div className="voting-section">
        <h2>Vote for your candidate:</h2>
        {candidates.length === 0 && <p>Loading candidates...</p>}
        {candidates.map((candidate) => (
            <div key={candidate._id} className="candidate-container">
                <p className="candidate-party">{candidate.party}</p>
                <p className="candidate-name">{candidate.name}</p>
                <button 
                    onClick={() => handleVote(candidate._id)} 
                    disabled={hasVoted} 
                    className="vote-button"
                >
                    {hasVoted ? "Voted" : "Vote"}
                </button>
            </div>
        ))}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
             
            </div>
                <Button  onClick={handleLogout}  style={{ backgroundColor: 'red', position: 'absolute', top: 0, right: 0, margin: '10px' }} text="LOGOUT" />
                <img 
                    src="user.png" 
                    alt="Profile" 
                    style={{ width: '40px', height: '40px', position: 'absolute', top: 0, right: '8rem', margin: '10px', cursor: 'pointer' }} 
                    onClick={() => setModalIsOpen(true)} 
                />
            </div>
          
    
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Profile Modal"
                style={customStyles}
            >
                <h2>User Profile</h2>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Aadhar Number:</strong> {userData.aadharNumber}</p>
                <div>
                    <label>Change Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordChange} style={passwordButtonStyle}>Confirm</button>
                </div>
                <button onClick={() => setModalIsOpen(false)} style={closeButtonStyle}>Close</button>
            </Modal>
        </main>
    );
};

// Custom styles for the modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        color: '#000',
    },
};

const passwordButtonStyle = {
    backgroundColor: 'Green',
    color: 'white',
    padding: '10px',
    height: '35px',
    width: '80px',
left :'10px',
position:'relative',
    // borderRadius: '50px',
    marginTop: '10px',
    cursor: 'pointer',
};

const closeButtonStyle = {
    backgroundColor: 'gray',
    color: 'white',
    padding: '10px',
    marginTop: '20px',
    cursor: 'pointer',
};

const mainStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'black',
    color: 'white',
    width: 'auto',
    height: '100vh',
};

const titleStyle = {
    fontSize: '3rem',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    fontFamily: '"Gupter", serif',
    fontWeight: 700,
    fontStyle: 'normal',
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

export default UserProfile;
