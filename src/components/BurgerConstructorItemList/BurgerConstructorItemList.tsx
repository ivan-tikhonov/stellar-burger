import burgerConstructorItemListStyle from './BurgerConstructorItemList.module.css';
import { updateConstructorItems } from '../../services/slices/ConstructorItemsSlice';
import { TIngredientItem } from '../../utils/types';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import { useAppDispatch } from '../../hooks/hooks';
import { FC } from 'react';
import { Reorder } from 'framer-motion';

interface BurgerConstructorItemListProps {
  constructorItems: TIngredientItem[];
}

const BurgerConstructorItemList: FC<BurgerConstructorItemListProps> = ({ constructorItems }) => {
  const dispatch = useAppDispatch();

  const update = (newList: TIngredientItem[]) => {
    dispatch(updateConstructorItems(newList));
  }

  return (
    <Reorder.Group
        axis='y'
        as='section'
        onReorder={(newList) => update(newList)}
        values={constructorItems}
        className={burgerConstructorItemListStyle.BurgerConstructorItemList}
    >
        {
            constructorItems.map((item) => item.type !== 'bun' && (
                <BurgerConstructorItem key={item.dragId} item={item} />
            ))
        }
    </Reorder.Group>
);
};


export default BurgerConstructorItemList;
