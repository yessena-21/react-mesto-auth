import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditAvatarClick, onEditProfileClick, onAddNewElementClick, onCardDeleteClick, onCardClick, cards, onCardLike }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content" >
            <section className="profile page__profile">
                <div className="profile__avatar avatar" onClick={onEditAvatarClick} style={{ backgroundImage: `url(${currentUser.avatar})` }} />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__button-edit" onClick={onEditProfileClick} />
                    <p className="profile__description"> {currentUser.about}</p>
                </div>
                <button type="button" className="profile__button-add" onClick={onAddNewElementClick} />
            </section>

            <section className="elements">
                <ul className="elements__photo-grid">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDeleteClick={onCardDeleteClick} />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;