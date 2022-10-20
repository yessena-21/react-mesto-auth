import React from 'react';
import PopupWithForm from "./PopupWithForm";
import useForm from '../hooks/useForm'

function AddNewElement({ isOpen, onClose, onAddPlace, isLoading }) {

  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
    setValues({})
  }


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
          value={values.name || ''}
          onChange={handleChange}
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
          value={values.link || ''}
          onChange={handleChange} required
        />
        <span className="form__input-error form__input-link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddNewElement