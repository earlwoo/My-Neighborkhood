import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { Button } from "@chakra-ui/react"

// import "./LoginForm.css"

function LoginFormModal() {
  const [showLIModal, setShowLIModal] = useState(false);

  return (
    <>
      <Button colorScheme="teal" variant="link" className="login__btn" onClick={() => setShowLIModal(true)}>Log In</Button>
      {showLIModal && (
        <Modal onClose={() => setShowLIModal(false)}>
          <LoginForm setShowLIModal={setShowLIModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
