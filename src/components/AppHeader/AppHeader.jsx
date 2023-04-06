import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppHeader = () => {
  const userData = useSelector((store) => store.userSlice);

  return (
    <header className={headerStyles.AppHeader}>
      <section className={headerStyles.HeaderButtons}>
        <nav className={headerStyles.NavButtons}>
          <NavLink to='/' className={`${headerStyles.AppHeaderItem} p-5`}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default ${isActive ? headerStyles.text_color_active : 'text_color_inactive'} ml-2`}>
                  Конструктор
                </span>
              </>
            )}
          </NavLink>
          <NavLink to='/feed' className={`${headerStyles.AppHeaderItem} p-5`}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default ${isActive ? headerStyles.text_color_active : 'text_color_inactive'} ml-2`}>
                  Лента заказов
                </span>
              </>
            )}
          </NavLink>
        </nav>
        <NavLink
          to='/profile'
          className={`${headerStyles.AppHeaderItem} p-5`}
          title={userData.isLoggedIn ? 'Перейти в личный кабинет' : 'Войти/Зарегистрироваться'}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <span className={`text text_type_main-default ${isActive ? headerStyles.text_color_active : 'text_color_inactive'} ml-2`}>
                {userData.isLoggedIn ? userData.user.name : 'Личный кабинет'}
              </span>
            </>
          )}
        </NavLink>
      </section>
      <section className={headerStyles.Logo}>
        <Logo />
      </section>
    </header>
  );
};

export default AppHeader;
