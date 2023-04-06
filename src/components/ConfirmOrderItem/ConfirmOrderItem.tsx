import styles from './ConfirmOrderItem.module.css';
import { TIngredientItem } from '../../utils/types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/hooks';

interface ConfirmOrderItemProps {
  item: TIngredientItem;
}

const ConfirmOrderItem: FC<ConfirmOrderItemProps> = ({ item }) => {
  const constructorItems = useAppSelector((store) => store.constructorItems.items);

  const count = useMemo(() => {
    return item.type === 'bun'
      ? constructorItems.filter(i => i._id === item._id).length + 1
      : constructorItems.filter(i => i._id === item._id).length;
  }, [constructorItems, item.type, item._id]);

  return (
    <section className={`${styles.ConfirmOrderItem}`}>
      <section className={styles.ConfirmOrderItemBody}>
        <img
          className={styles.ItemImage}
          src={item.image_mobile}
          alt='item'
        />
        <span className='text text_type_main-default'>
          {item.name}
        </span>
      </section>
      <section className={`${styles.ConfirmOrderItemPrice} mr-25`}>
        <span className='text text_type_digits-default'>
          {`${count > 1 ? `x${count}` : ''} ${item.price}`}
        </span>
        <CurrencyIcon type='primary' />
      </section>
    </section>
  );
};

export default ConfirmOrderItem;
