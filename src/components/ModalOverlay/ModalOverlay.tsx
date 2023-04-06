import modalOverlayStyles from './ModalOverlay.module.css';
import { FC } from 'react';

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  return (
      <div className={modalOverlayStyles.ModalOverlay} onClick={props.onClose} />
  );
};

export default ModalOverlay;
