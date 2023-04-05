import { Route, useNavigate, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import Modal from '../../components/Modal/Modal';
import { closeIngredientInfo } from '../../services/slices/IngredientSlice';


const ModalPages = ({ background }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeIngredientInfo());
    navigate(-1);
  }

  return (
    <>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

ModalPages.propTypes = {
  background: PropTypes.bool.isRequired
};

export default ModalPages;
