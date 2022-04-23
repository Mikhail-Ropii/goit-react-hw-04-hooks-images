import { Component } from 'react';
import { createPortal } from 'react-dom';
import '../styles.css';
import propTypes from 'prop-types';

const popupRoot = document.querySelector('#popup-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  hadleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.hadleOverlayClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      popupRoot
    );
  }
}

Modal.propTypes = {
  largeImageURL: propTypes.string,
  alt: propTypes.string,
};
