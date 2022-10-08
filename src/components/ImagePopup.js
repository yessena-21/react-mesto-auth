import React from 'react';

function ImagePopup(props) {
    const card = props.card;

    return (
        <div className={`popup popup_type_view-image ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup__image-container">
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__image-name">{card.name}</p>
                <button className="popup__exit-button" type="button" onClick={props.onClose} />
            </div>
        </div>

    )
}

export default ImagePopup