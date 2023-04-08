import styles from './OrderDetails.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, FC } from 'react';
import { onFetchOrder } from '../../services/slices/IngredientsItemsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

import { TOrder } from '../../services/slices/IngredientsItemsSlice';

const OrderDetails: FC = () => {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(store => store.ingredientsItems.items);
  const orders = useAppSelector(store => store.ingredientsItems.orders?.orders);
  const location = useLocation();
  const background = location.state?.background;

  let orderMatch: undefined | TOrder | null = null;

  useEffect(() => {
    if (location.pathname.startsWith('/profile') && !background) {
      dispatch(onFetchOrder(id!))
    } else if ((location.pathname.startsWith('/feed')) && !background) {
      dispatch(onFetchOrder(id!))
    }
  }, [location.pathname]);

  orderMatch = orders?.find(order => order.number.toString() === id)

  const returnIngredientsPrice = useCallback(() => {
    const arrOfIngredientsPrice = orderMatch?.ingredients?.map(ingredient => ingredients?.find(item => item._id === ingredient)?.price);

    return arrOfIngredientsPrice?.reduce((acc: number, item: number | undefined) => {
      if (item) {
        acc += item
      }
      return acc
    }, 0)
  }, [orderMatch?.ingredients])

  const returnIngredientsQuantity = useCallback((id: string | undefined) => {
    let ingredientsQuantity = 0
    orderMatch?.ingredients.map(ingredientId => {
      if (ingredientId === id) ingredientsQuantity++
    })
    return ingredientsQuantity
  }, [orderMatch?.ingredients])

  const returnIngredients = useCallback(() => {
    const mutatedIngredients = Array.from(new Set(orderMatch?.ingredients))
    return mutatedIngredients.map((ingredient, index) => {
      return ingredients?.find(item => item._id === ingredient)
    })
  }, [orderMatch?.ingredients])

  return (
    <div className={`pl-10 pr-10 pb-10 ${styles.OrderDetails}`}>
      <p className={`mt-15 mb-10 text text_type_digits-default`}>
        {`#${orderMatch?.number}`}
      </p>
      <p className={`text text_type_main-medium`}>{`${orderMatch?.name}`}</p>
      <p className={`mt-2 mb-15 text text_type_main-small ${orderMatch?.status === 'done' ? 'text_color_success' : null}`}>
        {`${orderMatch?.status === 'done' ? 'Выполнен' : 'Готовится'}`}
      </p>
      <p className={`mb-6 text text_type_main-medium`}>Состав:</p>
      <ul className={styles.OrderDetailsList}>
        {
          returnIngredients().map((ingredient, index) => {
            return <li key={ingredient?._id} className={styles.OrderDetailsItem} >
              <div className={styles.OrderDetailsItemBlock}>
                <img src={ingredient?.image} alt={ingredient?.name} className={styles.OrderDetailsItemImage} />
                <p className={`text_type_main-small ${styles.OrderDetailsItemName}`}>{ingredient?.name}</p>
              </div>
              <div className={styles.OrderDetailsTotal}>
                <p className={`mr-2 text text_type_digits-default`}>{`${returnIngredientsQuantity(ingredient?._id)} x ${ingredient?.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          })
        }
      </ul>

      <div className={`mt-10 ${styles.OrderDetailsFooter}`}>
        <p className={`text text_color_inactive text_type_main-default`}>
          <FormattedDate date={new Date(orderMatch!.createdAt)} /> i-GMT+3
        </p>
        <div className={styles.OrderDetailsTotal}>
          <p className={`mr-2 text text_type_digits-default`}>{returnIngredientsPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
