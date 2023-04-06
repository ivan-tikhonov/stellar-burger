import styles from './OrderPending.module.css';
import { FC } from 'react';

const OrderPending: FC = () => {
  return (
    <div className={`${styles.OrderPending} pt-30 pb-30`}>
      <section className={styles.Loading}>
        <div className={styles.Loader}>
          <span></span>
        </div>
        <p className='text text_type_main-medium mt-10'>Отправляем заказ по спутнику</p>
      </section>
    </div>
  );
};

export default OrderPending;
