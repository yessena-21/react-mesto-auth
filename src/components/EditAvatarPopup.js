import React, { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";
function EditAvatar({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    const avatarLink = useRef();
    
    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarLink.current.value,
        });

    }

    React.useEffect(() => {
        avatarLink.current.value='';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <label className="popup__field">
                <input
                    ref={avatarLink}
                    className="form__input form__input-link"
                    id="form__input-avatar"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на картинку"
                    required />
                <span className="form__input-error form__input-avatar-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatar