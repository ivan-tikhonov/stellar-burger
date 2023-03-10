import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './BurgerIngredientsTab.module.css';

const BurgerIngredientsTab = () => {
  const [current, setCurrent] = useState('buns');

  return (
    <div className={`${styles.BurgerIngredientsTab} mb-10`}>
      <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauses" active={current === 'sauses'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="ingredients" active={current === 'ingredients'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

export default BurgerIngredientsTab;
