import orderConfirmStyles from './OrderConfirm.module.css';
import doneButton from '../../images/done.svg';
import { useAppSelector } from '../../hooks/hooks';
import { FC } from 'react';

const OrderConfirm: FC = () => {
  const orderNumber = useAppSelector((store) => store.order.orderNumber);

  return (
    <div className={`${orderConfirmStyles.OrderDetails} pt-30 pb-30`}>
      <span className={`${orderConfirmStyles.OrderNumber} text text_type_digits-large mb-8`}>
        {orderNumber}
      </span>
      <span className='text text_type_main-medium'>
        идентефикатор заказа
      </span>
      <img src={doneButton} alt="all done" className={`${orderConfirmStyles.DoneButton} mt-15 mb-15`} />

      <span className='text text_type_main-small mb-2'>
        Ваш заказ начали готовить
      </span>
      <span className='text text_type_main-small text_color_inactive'>
        Дождитесь готовности на орбитной станции
      </span>
    </div>
  );
};

export default OrderConfirm;
