import styles from './Order.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { TOrder } from '../../services/slices/IngredientsItemsSlice';

interface IOrderProps {
  orderInfo: TOrder
}

export const Order: FC<IOrderProps> = ({ orderInfo }) => {

  const ingredients = useAppSelector(store => store.ingredientsItems.items);
  const user = useAppSelector(state => state.userSlice.user.name);
  const location = useLocation();

  const returnIngredientsPrice = useCallback(() => {
    const arrOfIngredientsPrice = orderInfo?.ingredients?.map(ingredient => {
      if (ingredient !== null) {
        return ingredients?.find(item => item?._id === ingredient)?.price
      } else {
        return 0
      }
    })

    return arrOfIngredientsPrice.reduce((acc: number, item: number | undefined) => {
      if (item) {
        acc += item
      }
      return acc
    }, 0)
  }, [orderInfo?.ingredients])

  const returnIngredients = useCallback(() => {
    const mutatedIngredients = Array.from(new Set(orderInfo?.ingredients))
    return mutatedIngredients.map((ingredient, index) => {
      return ingredients?.find(item => item._id === ingredient)
    })
  }, [orderInfo?.ingredients])

  let offset = -45;


  return (
    <li className={`pl-6 pr-6 pb-6 mr-2 ${styles.Order}`}>
      <div className={`mt-6 ${styles.OrderHeader}`}>
        <p className={`text text_type_digits-default`}>
          {`#${orderInfo?.number}`}
        </p>
        <p className={`text text_color_inactive text_type_main-default`}>
          <FormattedDate date={new Date(orderInfo?.createdAt)} /> i-GMT+3
        </p>
      </div>
      <p className={`text text_type_main-medium`}>{`${orderInfo?.name}`}</p>

      {
        user && location.pathname === '/profile/orders' && (<p className={`text text_type_main-small ${orderInfo?.status === 'done' ? 'text_color_success' : null}`}>{`${orderInfo?.status === 'done' ? 'Выполнен' : 'Готовится'}`}</p>)
      }

      <div className={`mb-6 ${styles.OrderContent}`}>
        <ul className={styles.OrderIngredients}>

          {
            returnIngredients().map((ingredient, index) => {
              offset = offset + 45;
              if (index > 5) {
                return null
              } else if (index === 5) {
                return <li
                  key={index}
                  style={{ left: offset + 'px' }}
                  className={styles.OrderIngredient}
                >
                  <img
                    src={ingredient?.image}
                    alt={ingredient?.name}
                    style={{ opacity: 0.4 }}
                    className={styles.OrderIngredientImage}
                  />
                  <p className={`text ${styles.OrderIngredientCounter}`} style={{ zIndex: 6 }}>
                    {`+${returnIngredients().length - index}`}
                  </p>
                </li>
              } else {
                return <li
                  key={index}
                  style={{ left: offset + 'px' }}
                  className={styles.OrderIngredient}
                >
                  <img
                    src={ingredient?.image}
                    alt={ingredient?.name}
                    className={styles.OrderIngredientImage}
                  />
                </li>
              }
            })
          }
        </ul>
        <div className={`pt-5 ${styles.OrderTotal}`}>
          <p className={`mr-2 text text_type_digits-default`}>{returnIngredientsPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li >
  )

}
