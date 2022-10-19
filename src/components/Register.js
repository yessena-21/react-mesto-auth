import { Link} from 'react-router-dom';
import React, {useState} from "react";

function Register({ onRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    <form className="register-form" name="registerForm" onSubmit={handleSubmit} type="submit">
      <h2 className="register-form__title">Регистрация</h2>
      <section className="register-form__section">
        <input
          onChange={({ target: { value } }) => setEmail(value)}
          type="email"
          name="email"
          className="register-form__input"
          value={email}
          placeholder="Email"
          required
          aria-label="Поле для ввода почты"
        />
      </section>
      <section className="register-form__section">
        <input
          onChange={({ target: { value } }) => setPassword(value)}
          type="password"
          name="password"
          className="register-form__input"
          value={password}
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