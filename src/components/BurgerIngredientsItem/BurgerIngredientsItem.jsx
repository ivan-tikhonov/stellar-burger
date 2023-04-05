import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './BurgerIngredientsItem.module.css';
import PropTypes from 'prop-types';
import IngredientItem from '../../utils/types';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addConstructorItem } from '../../services/slices/ConstructorItemsSlice';
import { showIngredientInfo } from '../../services/slices/IngredientSlice';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

const BurgerIngredientsItem = ({ item }) => {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...item }
  });

  const location = useLocation();

  const dispatch = useDispatch();

  const constructorItems = useSelector((store) => store.constructorItems.items);

  const handleOpenIgredientInfoModal = useCallback((item) => {
    dispatch(showIngredientInfo(item));
  }, [dispatch]);

  const count = constructorItems.filter(i => i._id === item._id).length;

  return (
    <Link
      className={itemStyles.Link}
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
    >
      <div
        ref={dragRef}
        className={`${itemStyles.BurgerIngredientsItem} mb-8`}
        onClick={handleOpenIgredientInfoModal}
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
    </Link>
  );
};

BurgerIngredientsItem.propTypes = {
  item: IngredientItem.isRequired
}

export default BurgerIngredientsItem;
