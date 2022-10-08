function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, onSubmit, isLoading }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h3 className="popup__title">{title}</h3>
                <form className="form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button
                        className="form__save-button form__save-button_submit"
                        type="submit"
                    >{`${isLoading ? `Сохранение...` : `${buttonText}`}`}</button>
                </form>
                <button className="popup__exit-button" type="button" onClick={onClose} />

            </div>
        </div>
    )
}

export default PopupWithForm;