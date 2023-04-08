import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { fetchData } from '../../services/slices/IngredientsItemsSlice';
import { getUserData } from '../../services/slices/UserSlice';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { FC, useEffect } from 'react';

import Main from '../../pages/Main/Main';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import IngredientDetailsPage from '../../pages/IngredientDetails/IngredientDetailsPage';
import ModalPages from '../../pages/ModalPages/ModalPages';
import Feed from '../../pages/Feed/Feed';


const App: FC = () => {
  const state = useAppSelector((store) => store.ingredientsItems);
  const userData = useAppSelector((store) => store.userSlice);

  const dispatch = useAppDispatch();

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
              <Route
                path='/ingredients/:ingredientId'
                element={<IngredientDetailsPage />}
              />
              <Route path='/login' element={<ProtectedRoute anonymous element={<Login />} />} />
              <Route path='/register' element={<ProtectedRoute anonymous element={<Register />} />} />
              <Route path='/forgot-password' element={<ProtectedRoute anonymous element={<ForgotPassword />} />} />
              <Route path='/reset-password' element={<ProtectedRoute anonymous element={<ResetPassword />} />} />
            </Routes>
            <ModalPages background={background} />
          </>
        )
      }
    </div>
  );
};

export default App;
