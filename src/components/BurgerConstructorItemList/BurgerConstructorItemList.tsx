import burgerConstructorItemListStyle from './BurgerConstructorItemList.module.css';
import { updateConstructorItems } from '../../services/slices/ConstructorItemsSlice';
import PropTypes from 'prop-types';
import { TIngredientItem } from '../../utils/types';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import { useAppDispatch } from '../../hooks/hooks';
import { FC } from 'react';

interface BurgerConstructorItemListProps {
  constructorItems: TIngredientItem[];
}

const BurgerConstructorItemList: FC<BurgerConstructorItemListProps> = ({ constructorItems }) => {
  const dispatch = useAppDispatch();

  const update = (newList: TIngredientItem[]) => {
    dispatch(updateConstructorItems(newList));
  }

  return (
    <section className={burgerConstructorItemListStyle.List}>
      {
        constructorItems.map((item) => item.type !== 'bun' && (
          <BurgerConstructorItem key={item.dragId} item={item} />
        ))
      }
    </section>
  );
};

export default BurgerConstructorItemList;
