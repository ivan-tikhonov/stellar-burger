import modalOverlayStyles from './ModalOverlay.module.css';

const ModalOverlay = (props) => {
  return (
    <div className={modalOverlayStyles.Overlay} onClick={props.onClose} />
  );
};


export default ModalOverlay;
