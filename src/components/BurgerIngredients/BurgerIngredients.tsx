import { FC, useEffect, useMemo, useRef, useState } from 'react';
import ingredientsStyles from './BurgerIngredients.module.css';
import BurgerIngredientsTab from '../BurgerIngredientsTab/BurgerIngredientsTab';
import BurgerIngredientsItemList from '../BurgerIngredientsItemList/BurgerIngredientsItemList';

import { useAppSelector } from '../../hooks/hooks';

const BurgerIngredients: FC = () => {
  const data = useAppSelector((store) => store.ingredientsItems.items);

  const buns = useMemo(() => data.filter(item => item.type === 'bun'), [data]);
  const mains = useMemo(() => data.filter(item => item.type === 'main'), [data]);
  const sauces = useMemo(() => data.filter(item => item.type === 'sauce'), [data]);

  const [currentCategory, setCurrentCategory] = useState(0);

  const scrollArea = useRef(null);
  const refs = useRef<HTMLParagraphElement[]>([]);

  const setCategory = (index: number) => {
    refs.current[index].scrollIntoView({ block: 'start', behavior: 'smooth' });
    setCurrentCategory(index);
  }

  useEffect(() => {
    const headers: any = {};

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        headers[entry.target.id] = entry.isIntersecting;
      });
      for (const header in headers) {
        if (headers[header]) {
          setCategory(Number(header));
          break;
        }
      }
    }, { root: scrollArea.current });

    refs.current.forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [refs]);


  return (
    <div className={`${ingredientsStyles.BurgerIngredients} mt-10`}>
      <p className='text text_type_main-large mb-5'>
        Соберите бургер
      </p>
      <BurgerIngredientsTab currentCategory={currentCategory} setCategory={setCategory} />

      <section ref={scrollArea} className={ingredientsStyles.BurgerIngredientsContainer}>
        <BurgerIngredientsItemList index={0} refs={refs} title='Булки' data={buns} />
        <BurgerIngredientsItemList index={1} refs={refs} title='Соусы' data={sauces} />
        <BurgerIngredientsItemList index={2} refs={refs} title='Начинки' data={mains} />

      </section>
    </div>
  );
};

export default BurgerIngredients;

