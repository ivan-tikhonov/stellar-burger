import { useState, useCallback, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { updateUser } from '../services/slices/UserSlice'

export const useForm = (inputValues: any, handleDisablerForm?: (value: boolean) => void) => {
  const dispatch = useAppDispatch()
  const store = useAppSelector(store => store);
  const [values, setValues] = useState(inputValues);
  const [isFormEdited, setIsFormEdited] = useState(false);

  const resetForm = useCallback((newValues = {}) => {
    setValues(newValues);
  }, [setValues]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    if (typeof handleDisablerForm === 'function') {
      handleDisablerForm(false);
    }
    setIsFormEdited(true)
  }

  const handleResetForm = () => {
    setValues({
      name: store.userSlice.user.name,
      email: store.userSlice.user.email,
      password: '',
      token: ''
    })
    setIsFormEdited(false)
  }

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name) {
      dispatch(updateUser(values))
      setValues({
        name: '',
        email: '',
        password: '',
        token: ''
      })
      setIsFormEdited(false)
    }
  }


  return { values, isFormEdited, handleChange, setValues, resetForm, handleResetForm, handleUpdateUser };
}
