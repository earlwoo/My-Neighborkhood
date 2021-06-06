import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';
import { Button } from "@chakra-ui/react"
// import "./LoginForm.css"

function SignUpFormModal() {
  const [showSUModal, setShowSUModal] = useState(false);

  return (
    <>
      <Button colorScheme="teal" variant="link" className="signup__btn" onClick={() => setShowSUModal(true)}>Sign Up</Button>
      {showSUModal && (
        <Modal onClose={() => setShowSUModal(false)}>
          <SignUpForm setShowSUModal={setShowSUModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
