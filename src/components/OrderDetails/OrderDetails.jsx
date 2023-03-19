import orderDetailsStyles from './OrderDetails.module.css';
import doneButton from '../../images/done.svg';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
  const orderNumber = useSelector((store) => store.order.orderNumber);

  return (
    <div className={`${orderDetailsStyles.OrderDetails} pt-30 pb-30`}>
      <span className={`${orderDetailsStyles.OrderNumber} text text_type_digits-large mb-8`}>
        {orderNumber}
      </span>
      <span className='text text_type_main-medium'>
        идентефикатор заказа
      </span>
      <img src={doneButton} alt="all done" className={`${orderDetailsStyles.DoneButton} mt-15 mb-15`} />

      <span className='text text_type_main-small mb-2'>
        Ваш заказ начали готовить
      </span>
      <span className='text text_type_main-small text_color_inactive'>
        Дождитесь готовности на орбитной станции
      </span>
    </div>
  );
};

export default OrderDetails;
