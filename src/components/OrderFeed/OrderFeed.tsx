import styles from './OrderFeed.module.css';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Order } from '../Order/Order'
import { useAppSelector } from '../../hooks/hooks';

export const OrderFeed: FC = () => {

  const location = useLocation();
  const ingredients = useAppSelector(store => store.ingredientsItems.items);
  const orders = useAppSelector(store => store.ingredientsItems.orders);


  return (
    <ul className={`${styles.OrderFeed} mt-10 profile__orders`}>
      {
        orders?.orders?.map(order => (
          <Link className={`text text_type_main-small ${styles.OrderFeedLink}`} key={order.number}
          to={location.pathname.startsWith('/profile') ? `/profile/orders/${order.number}` : `/feed/${order.number}`}
          state={ {background: location } }
          >
            <Order orderInfo={order} />
          </Link>
        ))
      }
    </ul>
  )
}
