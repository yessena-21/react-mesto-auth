
import React, { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from '../hooks/useForm';

function EditProfile({ isOpen, onClose, onUpdateUser, isLoading }) {

    const { values, handleChange, setValues } = useForm({});
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values);
    }
    useEffect(() => {
        setValues(
            {
                name: currentUser.name,
                about: currentUser.about,
            }
        )
    }, [currentUser, isOpen, setValues]);

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
                    value={values.name || ''}
                    onChange={handleChange}
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
                    value={values.about || ''}
                    onChange={handleChange}
                />
                <span className="form__input-error form__input-description-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfile