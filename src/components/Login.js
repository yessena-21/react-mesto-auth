import { useHistory } from 'react-router-dom';
import React from "react";
import useForm from '../hooks/useForm';

function Login({ onLogin, showInfoTooltip }) {

  const { values, handleChange, setValues } = useForm({});
  const history = useHistory();

  const handleSubmit = (e) => {

    e.preventDefault();
    onLogin(values)
      .then(setValues({}))
      .then(() => history.push('/'))
      .catch((err) => showInfoTooltip(true, err));

  };

  return (
    <form className="login-form" name="loginForm" onSubmit={handleSubmit} type="submit">
      <h2 className="login-form__title">Вход</h2>
      <section className="login-form__section">
        <input
          onChange={handleChange}
          type="email"
          name="email"
          className="login-form__input"
          value={values.email || ''}
          placeholder="Email"
          required
          aria-label="Поле для ввода почты"
        />
      </section>
      <section className="login-form__section">
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className="login-form__input"
          value={values.password || ''}
          placeholder="Пароль"
          required
          minLength="5"
          aria-label="Поле для ввода пароля"
        />
      </section>

      <button type="submit" className="login-form__submit btn-hover">
        Войти
      </button>

    </form>
  );
}

export default Login; 