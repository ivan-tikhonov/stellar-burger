import styles from './OrderSummary.module.css';
import { useCallback, FC } from 'react';
import { useAppSelector } from '../../hooks/hooks';

export const OrderSummary: FC = () => {

  const orders = useAppSelector(store => store.ingredientsItems.orders);
  const totalOrders = orders?.total;
  const totalOrdersToday = orders?.totalToday

  const readyOrders = useCallback(() => {
    return orders?.orders?.filter(order => order.status === 'done').map(order => order.number)
  }, [orders?.orders]);

  const notReadyOrders = useCallback(() => {
    return orders?.orders?.filter(order => order.status !== 'done').map(order => order.number)
  }, [orders?.orders]);

  return (
    <div className={styles.OrderSummary}>
      <article className={`mb-15 ${styles.OrderSummaryContainer}`}>
        <div className={styles.OrderSummaryBoard}>
          <p className={`mb-6 text text_type_main-medium`}> Готовы:</p>
          <ul className={styles.OrderSummaryBoardList}>
            {
              readyOrders()?.map((order, index) => {
                if (index < 20) {
                  return (<li key={order} className={`text text_type_digits-default text_color_success ${styles.OrderSummaryBoardItem}`}>{order}</li>)
                }
              }
              )
            }
          </ul>
        </div>
        <div className={styles.OrderSummaryBoard}>
          <p className={`mb-6 text text_type_main-medium`}> В работе:</p>
          <ul className={styles.OrderSummaryBoardList}>
            {
              notReadyOrders()?.map((order, index) => {
                if (index < 20) {
                  return (<li key={order} className={`text text_type_digits-default ${styles.OrderSummaryBoardItem}`}>{order}</li>)
                }
              }
              )
            }
          </ul>
        </div>
      </article>
      <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
      <p className={`mb-15 text text_type_digits-large ${styles.OrderSummaryNumber}`} >{totalOrders}</p>
      <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
      <p className={`mb-15 text text_type_digits-large ${styles.OrderSummaryNumber}`} >{totalOrdersToday}</p>
    </div>
  )
}

export default OrderSummary;
