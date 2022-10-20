import React from 'react';
import useForm from '../hooks/useForm';

function AuthForm({ title, submitBtnText, onSubmit, children, comp }) {
    const { values, handleChange, setValues } = useForm({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
    setValues({});
  };

  return (
    <form className="auth-form" name="authForm" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">{title}</h2>
      <section className="auth-form__section">
        <input
          onChange={handleChange}
          type="email"
          name="email"
          className="auth-form__input"
          value={values.email || ''}
          placeholder="Email"
          required
          aria-label="Поле для ввода почты"
        />
      </section>
      <section className="auth-form__section">
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className="auth-form__input"
          value={values.password || ''}
          placeholder="Пароль"
          required
          minLength="5"
          aria-label="Поле для ввода пароля"
        />
      </section>
      {comp}
      <button type="submit" className="auth-form__submit btn-hover">
        {submitBtnText}
      </button>

      <p className="auth-form__wrap-link">{children}</p>
    </form>
  );
}

export default AuthForm;