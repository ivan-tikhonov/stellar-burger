import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('root');

const Modal = (props) => {
  const { children, onClose } = props;

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


export default Modal;
