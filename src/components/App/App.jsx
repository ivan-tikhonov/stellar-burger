import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../services/slices/IngredientsItemsSlice';
import { closeOrderModal } from '../../services/slices/OrderSlice';
import { closeIngredientInfo } from '../../services/slices/IngredientSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const state = useSelector((store) => store.ingredientsItems);
  const orderInfo = useSelector((store) => store.order);
  const ingredientInfo = useSelector((store) => store.ingredientInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleCloseOrderModal = useCallback(() => {
    dispatch(closeOrderModal());
  }, [orderInfo]);

  const handleCloseIgredientInfoModal = useCallback(() => {
    dispatch(closeIngredientInfo());
  }, [ingredientInfo]);

  return (
    <div className={styles.App}>
      <AppHeader />
      {state.items.length &&
        <main className={styles.Main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      }
      {orderInfo.status === 'visible' &&
        (
          <Modal onClose={handleCloseOrderModal}>
              <OrderDetails onClose={handleCloseOrderModal}/>
          </Modal>
        )
      }
      {ingredientInfo.status === 'visible' &&
        (
          <Modal onClose={handleCloseIgredientInfoModal}>
              <IngredientDetails ingredientItem={ingredientInfo.item} onClose={handleCloseIgredientInfoModal} />
          </Modal>
        )
      }
    </div>
  );
}

export default App;
