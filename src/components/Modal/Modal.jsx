import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modals');

const Modal = (props) => {
  const { children, onClose } = props;

  useEffect(() => {
    const handleKeydownModalClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeydownModalClose);
    return () => {
        document.removeEventListener('keydown', handleKeydownModalClose);
    }
  }, []);

  return createPortal(
    (
      <div className={modalStyles.Modal}>
        <ModalOverlay onClose={onClose} />
        <section className={modalStyles.ModalContent}>
          {children}
        </section>
      </div>
    ), modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
};


export default Modal;
