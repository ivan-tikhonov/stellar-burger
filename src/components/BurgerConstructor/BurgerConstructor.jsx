import { useCallback } from 'react';
import styles from './BurgerConstructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addConstructorItem, deleteConstructorItem } from '../../services/slices/ConstructorItemsSlice';
import { postOrder } from '../../services/slices/OrderSlice';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItemList from '../BurgerConstructorItemList/BurgerConstructorItemList';
import { useDrop } from 'react-dnd';
import uuid from 'react-uuid';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(addConstructorItem({ ...item, dragId: uuid() }))
    }
  });

  const constructorItems = useSelector((store) => store.constructorItems.items);
  const bun = constructorItems.find(item => item.type === 'bun');
  const totalPrice = constructorItems.reduce((acc, item) => acc + item.price, 0) + bun.price;

  const handlePostOrder = useCallback(() => {
    const ingredientsId = constructorItems.map(item => item._id);
    dispatch(postOrder(ingredientsId));
  }, [constructorItems]);

  return (
    <div
      ref={dropTargetRef}
      className={`${styles.BurgerConstructor} ml-10 mt-25`}
    >
      <section className={styles.BurgerSection}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          extraClass='ml-6'
        />
        {constructorItems.length > 1 && (
          <BurgerConstructorItemList constructorItems={constructorItems} />
        )}
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          extraClass='ml-6'
        />
      </section>
      <section className={`${styles.Total} mt-10`}>
        <section className={`${styles.Price} mr-10`}>
          <p className='text text_type_digits-medium'>
            {totalPrice}
          </p>
          <CurrencyIcon type='primary' />
        </section>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          extraClass='mr-4'
          onClick={handlePostOrder}
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
};

export default BurgerConstructor;
