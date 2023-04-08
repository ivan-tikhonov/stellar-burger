import { Route, useNavigate, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { FC } from 'react';

import IngredientDetails from '../IngredientDetails/IngredientDetailsPage';
import Modal from '../../components/Modal/Modal';
import { closeIngredientInfo } from '../../services/slices/IngredientSlice';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';

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
          <Route
            path='/feed/:id'
            element={
              <Modal onClose={handleCloseModal} >
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <ProtectedRoute
                element={
                  <Modal onClose={handleCloseModal}>
                    <OrderDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
};


export default ModalPages;
