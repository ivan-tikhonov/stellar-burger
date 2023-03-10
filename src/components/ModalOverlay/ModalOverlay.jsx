import modalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  return (
    <div className={modalOverlayStyles.Overlay} onClick={props.onClose} />
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
