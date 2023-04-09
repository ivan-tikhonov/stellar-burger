import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { fetchData } from '../../services/slices/IngredientsItemsSlice';
import { getUserData } from '../../services/slices/UserSlice';
import { closeIngredientInfo } from '../../services/slices/IngredientSlice';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { FC, useEffect } from 'react';

import Main from '../../pages/Main/Main';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import IngredientDetailsPage from '../../pages/IngredientDetails/IngredientDetailsPage';
import Feed from '../../pages/Feed/Feed';
import Modal from '../../components/Modal/Modal';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import IngredientDetails from '../../pages/IngredientDetails/IngredientDetailsPage';


const App: FC = () => {
  const state = useAppSelector((store) => store.ingredientsItems);
  const userData = useAppSelector((store) => store.userSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseModal = (): void => {
    dispatch(closeIngredientInfo());
    navigate(-1);
  }

  useEffect(() => {
    dispatch(fetchData());

    if (!userData.isLoggedIn) {
      dispatch(getUserData());
    }
  }, []);

  const location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div className={styles.App}>
      {state.status === 'loading'
        ? (
          <section className={styles.Loading}>
            <div className={styles.Loader}>
              <span></span>
            </div>
            <p className='text text_type_main-medium mt-4'>Ловим связь с соседней галактики</p>
          </section>
        )
        : (
          <>
            <AppHeader />
            <Routes location={background || location}>
              <Route path='/' element={<Main />} />
              <Route path='/feed' element={<Feed />} />
              <Route path='/profile' element={<ProtectedRoute element={<Profile />} />} />
              <Route path='/profile/orders' element={<ProtectedRoute element={<Profile />} />} />
              <Route path='profile/orders/:id' element={<ProtectedRoute element={<OrderDetails />} />} />
              <Route
                path='/ingredients/:ingredientId'
                element={<IngredientDetailsPage />}
              />
              <Route path='/feed/:id' element={<OrderDetails />} />
              <Route path='/login' element={<ProtectedRoute anonymous element={<Login />} />} />
              <Route path='/register' element={<ProtectedRoute anonymous element={<Register />} />} />
              <Route path='/forgot-password' element={<ProtectedRoute anonymous element={<ForgotPassword />} />} />
              <Route path='/reset-password' element={<ProtectedRoute anonymous element={<ResetPassword />} />} />
            </Routes>
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
        )
      }
    </div>
  );
};

export default App;
