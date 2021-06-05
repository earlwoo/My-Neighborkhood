// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GrClose as Close } from "react-icons/gr";
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        <div id="modal__close-button"><Close onClick={onClose} id="close__button" /></div>
          {children}
      </div>
    </div>,
    modalNode
  );
}
