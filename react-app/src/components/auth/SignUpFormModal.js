import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';
// import "./LoginForm.css"

function SignUpFormModal() {
  const [showSUModal, setShowSUModal] = useState(false);

  return (
    <>
      <button className="signup__btn" onClick={() => setShowSUModal(true)}>Sign Up</button>
      {showSUModal && (
        <Modal onClose={() => setShowSUModal(false)}>
          <SignUpForm setShowSUModal={setShowSUModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
