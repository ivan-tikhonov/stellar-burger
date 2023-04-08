import { FC, FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';

import { useForm } from '../../hooks/useForm';
import styles from './Login.module.css';
import { login } from '../../services/slices/UserSlice';
import { TLoginData } from '../../utils/types';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const initialFormState: TLoginData = {
    email: '',
    password: ''
};

  const { values, handleChange } = useForm(initialFormState);

  const handlePostLoginForm = useCallback((e: FormEvent) => {
    e.preventDefault();

    dispatch(login(values));
  }, [dispatch, values]);

  return (
    <section className={styles.Login}>
      <form
        className={styles.LoginContainer}
        onSubmit={handlePostLoginForm}
      >
        <span className='text text_type_main-medium'>Вход</span>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder='E-mail'
          isIcon={false}
          extraClass='mt-6'
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass='mt-6 mb-6'
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          extraClass='mb-20'
        >
          Войти
        </Button>
        <section className={`${styles.Support} mb-4`}>
          <span className='text text_type_main-default text_color_inactive'>Вы - новый пользователь? </span>
          <Link to='/register' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Зарегистрироваться</Link>
        </section>
        <section className={styles.Support}>
          <span className='text text_type_main-default text_color_inactive'>Забыли пароль? </span>
          <Link to='/forgot-password' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Восстановить пароль</Link>
        </section>
      </form>
    </section>
  );
};

export default Login;
