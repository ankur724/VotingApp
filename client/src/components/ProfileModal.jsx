import  { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';


const ProfileModal = ({ isOpen, onRequestClose, userData, onPasswordChange }) => {
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = () => {
        onPasswordChange(newPassword);
        setNewPassword('');
    };
    ProfileModal.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        userData: PropTypes.shape({
            name: PropTypes.string.isRequired,
            aadharNumber: PropTypes.string.isRequired,
        }).isRequired,
        onPasswordChange: PropTypes.func.isRequired,
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
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
               
                <button onClick={handlePasswordChange}>Change Password</button>
            </div>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

// Custom styles for the modal (optional)
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default ProfileModal;
