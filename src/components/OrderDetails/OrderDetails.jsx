import orderDetailsStyles from './OrderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import doneButton from '../../images/done.svg';
const OrderDetails = (props) => {
  const { orderNumber, onClose } = props;

  return (
    <div className={`${orderDetailsStyles.OrderDetails} pt-30 pb-30`}>
      <section className={`${orderDetailsStyles.CloseButton} mt-15 mr-10`}>
        <CloseIcon type='primary' onClick={onClose} />
      </section>
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
