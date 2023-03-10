import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const App = () => {
  const [state, setState] = useState({
      data: []
  });

  const [constructorItemList, setConstructorItemList] = useState([]);

  const [orderModalState, setOrderModalState] = useState(false);
  const [ingredientInfoModalState, setIngredientInfoModalState] = useState(false);

  const [currentIngridient, setCurrentIngridient] = useState({});


  const handleOpenOrderModal = useCallback(() => {
      setOrderModalState(true);
  }, []);

  const handleOpenIgredientInfoModal = useCallback((item) => {
      setIngredientInfoModalState(true);
      setCurrentIngridient(item);
  }, []);

  const handleCloseModal = useCallback(() => {
      setOrderModalState(false);
      setIngredientInfoModalState(false);
  }, []);

  const getIngredientData = () => {
      fetch('https://norma.nomoreparties.space/api/ingredients')
          .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
          })
          .then(data => {
              setState({ ...state, data: data.data });
              setConstructorItemList(data.data.filter((item) => item.price < 1000));
          })
          .catch(error => console.log(error));
    }

    useEffect(() => {
      getIngredientData();
    }, []);




  return (
    <div className={styles.App}>
      <AppHeader />
      {state.data.length &&
        <main className={styles.Main}>
          <BurgerIngredients data={state.data} constructorItemList={constructorItemList} onHandleOpenModal={handleOpenIgredientInfoModal} />
          <BurgerConstructor constructorItemList={constructorItemList} onHandleCloseModal={handleOpenOrderModal} />
        </main>
      }
      {orderModalState &&
        (
          <Modal onClose={handleCloseModal}>
            <OrderDetails orderNumber={'034536'} onClose={handleCloseModal} />
          </Modal>
        )
      }
      {ingredientInfoModalState &&
        (
          <Modal onClose={handleCloseModal}>
            <IngredientDetails ingredientItem={currentIngridient} onClose={handleCloseModal} />
          </Modal>
        )
      }
    </div>
  );
}

export default App;
