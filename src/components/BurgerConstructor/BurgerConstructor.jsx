import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import constructorStyles from './BurgerConstructor.module.css';

const BurgerConstructor = (props) => {
    const { constructorItemList, onHandleCloseModal } = props;
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(constructorItemList.reduce((acc, item) => acc + item.price, 0));
    }, [constructorItemList]);

    return (
      <div className={`${constructorStyles.BurgerConstructor} ml-10 mt-25`}>
        <section className={constructorStyles.BurgerSection}>
        {
          constructorItemList.map((item, index) => (
            <section key={item._id}>
              <DragIcon type='primary' />
              <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                  extraClass={`${constructorStyles.Item}`}

              />
            </section>
          ))
        }
        </section>
        <section className={`${constructorStyles.Total} mt-10`}>
          <section className={`${constructorStyles.Price} mr-10`}>
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
              onClick={onHandleCloseModal}
          >
              Оформить заказ
          </Button>
        </section>
      </div>
    );
};


export default BurgerConstructor;
