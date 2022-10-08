import siteLogo from '../images/logo.svg'
function Header() {
    return(
    <header className="header page__header">
        <img src={siteLogo} alt="логотип сайта" className="header__logo" />
    </header>)
}
export default Header;