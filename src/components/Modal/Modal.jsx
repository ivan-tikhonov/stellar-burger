import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modals');

const Modal = (props) => {
  const { children, onClose } = props;

  useEffect(() => {
    const handleKeydownModalClose = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    // Add event listener when component did mount
    document.addEventListener('keydown', handleKeydownModalClose);

    // Remove event listener when component will unmount
    return () => {
        document.removeEventListener('keydown', handleKeydownModalClose);
    }
}, []);

  return createPortal(
    (
        <div className={modalStyles.Modal}>
            <ModalOverlay onClose={onClose} />
            <section className={modalStyles.ModalContent}>
              <section className={`${modalStyles.Close} mt-15 mr-10`}>
                        <CloseIcon type='primary' onClick={onClose} />
              </section>
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
