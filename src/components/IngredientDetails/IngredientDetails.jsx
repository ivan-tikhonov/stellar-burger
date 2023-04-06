import ingredientDetailsStyles from './IngredientDetails.module.css';
import IngredientItem from '../../utils/types';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

const IngredientDetails = (props) => {
  const { ingredientId } = useParams();

  const ingredientsItems = useSelector((store) => store.ingredientsItems.items);

  const ingredientItem = useMemo(() => {
    return ingredientsItems.find(item => item._id === ingredientId);
  }, [ingredientId, ingredientsItems]);

  return (
    <div className={ingredientDetailsStyles.IngredientDetails}>
      <header className={`${ingredientDetailsStyles.IngredientHeader} ml-10 mt-10 mr-10`}>
        <span className='text text_type_main-large'>
          Детали ингредиента
        </span>
      </header>
      <img src={ingredientItem.image_large} alt={ingredientItem.name} />
      <span className={`text text_type_main-medium ${ingredientDetailsStyles.IngredientTitle} mt-4 mb-8`}>{ingredientItem.name}</span>
      <section className={`${ingredientDetailsStyles.IngredientDetailsItemList} mb-15`}>
        <section className={ingredientDetailsStyles.IngredientDetailsItem}>
          <span className='text text_type_main-small text_color_inactive'>
            Калории,ккал
          </span>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredientItem.calories}
          </span>
        </section>
        <section className={ingredientDetailsStyles.IngredientDetailsItem}>
          <span className='text text_type_main-small text_color_inactive'>
            Белки,г
          </span>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredientItem.proteins}
          </span>
        </section>
        <section className={ingredientDetailsStyles.IngredientDetailsItem}>
          <span className='text text_type_main-small text_color_inactive'>
            Жиры,г
          </span>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredientItem.fat}
          </span>
        </section>
        <section className={ingredientDetailsStyles.IngredientDetailsItem}>
          <span className='text text_type_main-small text_color_inactive'>
            Углеводы,г
          </span>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredientItem.carbohydrates}
          </span>
        </section>
      </section>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredientItem: IngredientItem.isRequired
};

export default IngredientDetails;
