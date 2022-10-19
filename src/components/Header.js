import siteLogo from '../images/logo.svg'
import React from "react";
import { Link, useLocation } from 'react-router-dom';
function Header({ userEmail, loggedIn, onSignOut }) {
    const { pathname } = useLocation();

    const to =
    pathname === '/signup'
      ? '/signin'
      : pathname === '/signin'
      ? '/signup'
      : '';
  const text =
    pathname === '/signup'
      ? 'Войти'
      : pathname === '/signin'
      ? 'Регистрация'
      : '';

    return(
    <header className="header page__header">
        <img src={siteLogo} alt="логотип сайта" className="header__logo" />
        <div className="header__user-status">
        <p className="header__email">{userEmail}</p>
        {loggedIn ? (
          <Link to="/" className="header__link" onClick={onSignOut}>
            Выйти
          </Link>
        ) : (
          <Link to={to} className="header__link">
            {text}
          </Link>
        )}
      </div>  
    </header>)
}
export default Header;