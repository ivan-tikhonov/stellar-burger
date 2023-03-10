import ingredientsStyles from './BurgerIngredients.module.css';
import BurgerIngredientsTab from '../BurgerIngredientsTab/BurgerIngredientsTab';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
  const data = useSelector((store) => store.ingredientsItems.items);
  const buns = data.filter(item => item.type === 'bun');
  const mains = data.filter(item => item.type === 'main');
  const sauces = data.filter(item => item.type === 'sauce');

  return (
    <div className={`${ingredientsStyles.BurgerIngredients} mt-10`}>
      <p className='text text_type_main-large mb-5'>
        Соберите бургер
      </p>
      <BurgerIngredientsTab />

      <section className={ingredientsStyles.BurgerIngredientsContainer}>

        <div className={`${ingredientsStyles.BurgerIngredientsItem}`}>
          <p className='text text_type_main-medium mb-6'>
            Булки
          </p>
          <section className={`${ingredientsStyles.IngredientsContainer} ml-4`}>
            {
              buns.map((item) => (<BurgerIngredientsItem
                key={item._id}
                item={item}
              />))
            }
          </section>
        </div>

        <div className={`${ingredientsStyles.BurgerIngredientsItem}`}>
          <p className='text text_type_main-medium mb-6'>
            Соусы
          </p>
          <section className={`${ingredientsStyles.IngredientsContainer} ml-4`}>
            {
              sauces.map((item) => (<BurgerIngredientsItem
                key={item._id}
                item={item}
              />))
            }
          </section>
        </div>

        <div className={`${ingredientsStyles.BurgerIngredientsItem}`}>
          <p className='text text_type_main-medium mb-6'>
            Начинки
          </p>
          <section className={`${ingredientsStyles.IngredientsContainer} ml-4`}>
            {
              mains.map((item) => (<BurgerIngredientsItem
                key={item._id}
                item={item}
              />))
            }
          </section>
        </div>

      </section>
    </div>
    );
};

export default BurgerIngredients;

