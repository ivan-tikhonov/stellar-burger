import { useEffect, FC } from 'react';
import styles from './Feed.module.css';
import { OrderFeed } from '../../components/OrderFeed/OrderFeed';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import { setWebsocketConnection, setWebsocketOffline } from '../../services/slices/IngredientsItemsSlice';
import { URL_WSS } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

const Feed: FC = () => {

  const dispatch = useAppDispatch();
  const orders = useAppSelector(store => store.ingredientsItems.orders);
  const location = useLocation();

  useEffect(() => {
    dispatch(setWebsocketConnection(`${URL_WSS}/orders/all`))
    return () => {
      dispatch(setWebsocketOffline())
    }
  }, [location.pathname])


  return (
    <section className={styles.Feed}>
      <h3 className={`mt-10 mb-5 text text_type_main-large feed__title`}> Лента заказов </h3>
      <div className={styles.FeedContainer}>
        <>
          <div className={styles.FeedOrders}>
            <OrderFeed />
          </div>
          <div>
            <OrderSummary />
          </div>
        </>
      </div>
    </section>
  )
}

export default Feed;
