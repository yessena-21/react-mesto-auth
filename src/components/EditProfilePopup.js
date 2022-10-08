
import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfile({ isOpen, onClose, onUpdateUser, isLoading }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <label className="popup__field">
                <input
                    className="form__input form__input-name"
                    id="form__input-name"
                    type="text"
                    name="name"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name  ?? ''}
                    onChange={handleChangeName}
                />
                <span className="form__input-error form__input-name-error"></span>
            </label><label className="popup__field">
                <input
                    className="form__input form__input-description"
                    id="form__input-description"
                    type="text"
                    name="about"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description ?? ''}
                    onChange={handleChangeDescription}
                />
                <span className="form__input-error form__input-description-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfile