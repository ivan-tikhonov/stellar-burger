import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot: HTMLElement = document.getElementById('modals')!;

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}


const Modal: FC<ModalProps> = (props) => {
  const { children, onClose } = props;

  useEffect(() => {
    const handleKeydownModalClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeydownModalClose);

    return () => {
      document.removeEventListener('keydown', handleKeydownModalClose);
    }
  }, [onClose]);

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

export default Modal;
