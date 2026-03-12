// Modal.tsx
import React from 'react';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;