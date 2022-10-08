import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddNewElement({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);

  return (
    <PopupWithForm
      name="add-new-element"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__field">
        <input
          className="form__input form__input-title"
          id="form__input-title"
          type="text" name="name"
          placeholder="Название"
          required minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChangeName}
        />
        <span className="form__input-error form__input-title-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="form__input form__input-link"
          id="form__input-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleChangeLink} required
        />
        <span className="form__input-error form__input-link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddNewElement