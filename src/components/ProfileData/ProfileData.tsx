import styles from './ProfileData.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAppSelector } from '../../hooks/hooks';

export const ProfileData = () => {

    const store = useAppSelector(store => store);
    const updateRequest = useAppSelector(store => store.userSlice.status)
    const userUpdated = useAppSelector(store => store.userSlice.isUpdated)

    const userData = {
        name: store.userSlice.user.name,
        email: store.userSlice.user.email,
        password: '',
        token: ''
    }

    const { values, handleChange, isFormEdited, handleResetForm, handleUpdateUser } = useForm(userData);

    const isActive = isFormEdited && (values.name.length ? true : false) && (values.password.length > 5 ? true : false)

    useEffect(() => {
        handleResetForm()
    }, [updateRequest]);

    return (
        <form
            name='edit-data'
            action='#'
            onSubmit={handleUpdateUser}
            className={`mt-20 ${styles.ProfileData}`}
        >
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                icon={'EditIcon'}
                value={values.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass={`mb-6`}
            />
            <EmailInput
                extraClass={`mb-6`}
                placeholder={'Логин'}
                onChange={handleChange}
                value={values.email}
                name={'email'}
                isIcon={true}
            />
            <PasswordInput
                extraClass={`mb-6`}
                onChange={handleChange}
                value={values.password}
                name={'password'}
                icon="EditIcon"
            />
            <div className={styles.ProfileDataButtons}>
                <Button
                    htmlType='button'
                    type="secondary"
                    size="large"
                    disabled={!isFormEdited}
                    onClick={handleResetForm}
                >
                    Отмена
                </Button>
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    disabled={!isActive}
                >
                    Сохранить
                </Button>
            </div>

            {
                userUpdated && (<p className={`mt-5 text text_color_inactive text_type_main-default ${styles.ProfleDataStatus}`}>Изменения сохранены</p>)
            }

        </form >
    )
}
