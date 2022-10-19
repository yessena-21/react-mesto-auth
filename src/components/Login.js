import { useHistory } from 'react-router-dom';
import React, { useState, useCallback } from "react";

function Login({ onLogin, showInfoTooltip }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const resetForm = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])

  const handleSubmit = (e) => {

    e.preventDefault();
    onLogin({ email, password })
      .then(resetForm)
      .then(() => history.push('/'))
      .catch((err) => showInfoTooltip(true, err));

  };

  return (
    <form className="login-form" name="loginForm" onSubmit={handleSubmit} type="submit">
      <h2 className="login-form__title">Вход</h2>
      <section className="login-form__section">
        <input
          onChange={({ target: { value } }) => setEmail(value)}
          type="email"
          name="email"
          className="login-form__input"
          value={email || ''}
          placeholder="Email"
          required
          aria-label="Поле для ввода почты"
        />
      </section>
      <section className="login-form__section">
        <input
          onChange={({ target: { value } }) => setPassword(value)}
          type="password"
          name="password"
          className="login-form__input"
          value={password || ''}
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