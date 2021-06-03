import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
// import "./LoginForm.css"

function LoginFormModal() {
  const [showLIModal, setShowLIModal] = useState(false);

  // useEffect(()=>{

  // }, [])

  return (
    <>
      <button className="login__btn" onClick={() => setShowLIModal(true)}>Log In</button>
      {showLIModal && (
        <Modal onClose={() => setShowLIModal(false)}>
          <LoginForm setShowLIModal={setShowLIModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
