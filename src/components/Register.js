
import { Link, useHistory } from 'react-router-dom';
import React from "react";
import useForm  from '../hooks/useForm';

function Register({ onRegister, showInfoTooltip }) {

  const { values, handleChange, setValues } = useForm({});
 const history = useHistory();

  const handleSubmit = (e) => {

    e.preventDefault();
    onRegister(values)
      .then(setValues({}))
      .then(() => showInfoTooltip(false))
      .then(() => history.push('/signin'))
      .catch((err) => showInfoTooltip(true, err))
  }

  return (
    <form className="register-form" name="registerForm" onSubmit={handleSubmit} type="submit">
      <h2 className="register-form__title">Регистрация</h2>
      <section className="register-form__section">
        <input
          onChange={handleChange}
          type="email"
          name="email"
          className="register-form__input"
          value={values.email || ''}
          placeholder="Email"
          required
          aria-label="Поле для ввода почты"
        />
      </section>
      <section className="register-form__section">
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className="register-form__input"
          value={values.password || ''}
          placeholder="Пароль"
          required
          minLength="5"
          aria-label="Поле для ввода пароля"
        />
      </section>
      <button type="submit" className="register-form__submit btn-hover">
        Зарегистрироваться
      </button>

      <Link to="/signin" className="register-form__link">
        Уже зарегистрированы? Войти
      </Link>
    </form>

  );
}

export default Register;