import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles.css';
import propTypes from 'prop-types';

const popupRoot = document.querySelector('#popup-root');

export function Modal({ children, onModalClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const hadleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={hadleOverlayClick}>
      <div className="Modal">{children}</div>
    </div>,
    popupRoot
  );
}

Modal.propTypes = {
  largeImageURL: propTypes.string,
  alt: propTypes.string,
};
