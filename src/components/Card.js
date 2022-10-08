import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {

    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `elements__delete ${isOwn ? 'elements__delete_show' : 'elements__delete'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`elements__like${isLiked ? ' element__like_active' : ''}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDeleteClick(card);
    }

    return (
        <li className="elements__element" >
            <img className="elements__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick} />
            <div className="elements__description"  >
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements_like-group">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                    <span className="elements__like-counter">{card.likes.length}</span>
                </div>
            </div>
            <button aria-label="Delete" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
        </li>
    )
}
export default Card

