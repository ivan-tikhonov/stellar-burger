import { useCallback } from 'react';
import burgerConstructorItemListStyle from './BurgerConstructorItemList.module.css';
import { updateConstructorItems } from '../../services/slices/ConstructorItemsSlice';
import PropTypes from 'prop-types';
import IngredientItem from '../../utils/types';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import { useDispatch } from 'react-redux';

const BurgerConstructorItemList = ({ constructorItems }) => {
  const dispatch = useDispatch();
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragItem = constructorItems[dragIndex];
    const newItems = [...constructorItems];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    dispatch(updateConstructorItems(newItems));
  }, [constructorItems, dispatch]);
  return (
    <section className={burgerConstructorItemListStyle.List}>
      {
        constructorItems.map((item, index) => item.type !== 'bun' && (
          <BurgerConstructorItem key={item.dragId} index={index} item={item} moveCard={moveCard} />
        ))
      }
    </section>
  );
};

BurgerConstructorItemList.propTypes = {
  constructorItems: PropTypes.arrayOf(IngredientItem.isRequired).isRequired
};

export default BurgerConstructorItemList;
