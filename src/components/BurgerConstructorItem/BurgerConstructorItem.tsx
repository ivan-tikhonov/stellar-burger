import { FC, useRef } from 'react';
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css';
import PropTypes from 'prop-types';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteConstructorItem } from '../../services/slices/ConstructorItemsSlice';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientItem } from '../../utils/types';

interface BurgerConstructorItemProps {
  item: TIngredientItem;
}

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const deleteItem = (item: TIngredientItem) => {
    dispatch(deleteConstructorItem(item));
  }

  return (
    <>
      <DragIcon type='primary' />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        extraClass={burgerConstructorItemStyles.Item}
        handleClose={() => deleteItem(item)}
      />
    </>


  );
};


export default BurgerConstructorItem;
