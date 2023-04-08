import styles from './OrderError.module.css';
import { FC, memo } from 'react';

interface OrderErrorProps {
  message: string;
}

const OrderError: FC<OrderErrorProps> = ({ message }) => {

  return (
    <div className={`${styles.OrderError} pt-30 pb-30`}>
      <span className='text text_type_main-large mb-10'>
        Ошибка
      </span>
      <span className='text text_type_main-default text_color_inactive'>
        {message}
      </span>
    </div>
  );
};

export default OrderError;
