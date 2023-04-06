import { Route, useNavigate, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { FC } from 'react';

import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import Modal from '../../components/Modal/Modal';
import { closeIngredientInfo } from '../../services/slices/IngredientSlice';

interface ModalPagesProps {
  background: boolean;
}

const ModalPages: FC<ModalPagesProps> = ({ background }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
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


export default ModalPages;
