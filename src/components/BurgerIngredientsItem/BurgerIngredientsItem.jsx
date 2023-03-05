import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './BurgerIngredientsItem.module.css';

const BurgerIngredientsItem = (props) => {
  const { constructorItemList, item, onHandleOpenModal } = props;

  const count = constructorItemList.filter(i => i === item).length;

  return (
    <div
      className={`${itemStyles.BurgerIngredientsItem} mb-8`}
      onClick={() => {onHandleOpenModal(item)}}
    >
      <img src={item.image} alt="bun" className={itemStyles.BurgerImage} />
      {count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
      <p className={`text text_type_digits-default m-1 ${itemStyles.Price}`}>
          {item.price}
          <CurrencyIcon type='primary' />
      </p>
      <p className='text text_type_main-default mb-4'>
          {item.name}
      </p>
    </div>
  );
};

export default BurgerIngredientsItem;
