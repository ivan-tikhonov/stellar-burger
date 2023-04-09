import { FC, useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation, Routes, Route } from 'react-router-dom';


import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import styles from './Profile.module.css';
import { logout } from '../../services/slices/UserSlice';
import { ProfileData } from '../../components/ProfileData/ProfileData';
import { getItemLocalStorage } from '../../utils/localStorage'
import { setWebsocketConnection, setWebsocketOffline } from '../../services/slices/IngredientsItemsSlice';
import { URL_WSS } from '../../utils/api';
import { OrderFeed } from '../../components/OrderFeed/OrderFeed'


const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(store => store.ingredientsItems.orders)
  const { pathname } = useLocation();
  const accessToken = getItemLocalStorage('accessToken');

  useEffect(() => {
    dispatch(setWebsocketConnection(`${URL_WSS}/orders?token=${accessToken}`))
    return () => {
      dispatch(setWebsocketOffline())
    }
  }, [pathname])


  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);


  return (
    <section className={styles.Profile}>
      <nav className={`${styles.ProfileMenu} mt-3 mr-15`}>
        <NavLink to={`/profile`} className={`text text_type_main-medium ${styles.ProfileLink}`} >Профиль</NavLink>
        <NavLink to={`/profile/orders`} className={`text text_type_main-medium ${styles.ProfileLink}`}>История заказов</NavLink>
        <button
          type="button"
          className={`text text_type_main-medium text_color_inactive from global ${styles.ProfileButton}`}
          onClick={handleLogout}
        >
          Выход
        </button>
        {
          window.location.pathname === `/profile` &&
          <span className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</span>
        }

        {
          window.location.pathname.startsWith(`/profile/orders`) &&
          <span className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете просмотреть свою историю заказов
          </span>
        }

      </nav>
      <article className={`mt-10 ${styles.ProfileContent}`}>
        <Routes>
          <Route path={`/profile`} element={<ProfileData />} />
          <Route path={`/profile/orders`} element={
            orders && orders.orders.length === 0
              ?
              <>
                <p className={`mt-20 text text_color_inactive text_type_main-large ${styles.ProfileTextOrder}`}>Нет заказов</p>
                <Link to={`/`} className={`mt-10 text text_type_main-medium profile__link-order`} >
                  Создать первый заказ
                </Link>
              </>
              :
              <OrderFeed />
          } />
        </Routes>
      </article >
    </section>
  );
};

export default Profile;
