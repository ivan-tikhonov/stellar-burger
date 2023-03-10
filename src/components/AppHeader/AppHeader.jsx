import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';

const AppHeader = () => {
    return (
        <header className={headerStyles.AppHeader}>
            <section className={headerStyles.HeaderButtons}>
                <nav className={headerStyles.NavButtons}>
                    <a href='#' className={`${headerStyles.AppHeaderItem} p-5`}>
                        <BurgerIcon type='primary' />
                        <span className={`text text_type_main-default ${headerStyles.text_color_active} ml-2`}>
                            Конструктор
                        </span>
                    </a>
                    <a href='#' className={`${headerStyles.AppHeaderItem} p-5`}>
                        <ListIcon type='secondary' />
                        <span className='text text_type_main-default text_color_inactive ml-2'>
                            Лента заказов
                        </span>
                    </a>
                </nav>
                <a href='#' className={`${headerStyles.AppHeaderItem} p-5`}>
                    <ProfileIcon type='secondary' />
                    <span className='text text_type_main-default text_color_inactive ml-2'>
                        Личный кабинет
                    </span>
                </a>
            </section>
            <section className={headerStyles.Logo}>
                <Logo />
            </section>
        </header>
    );
};

export default AppHeader;