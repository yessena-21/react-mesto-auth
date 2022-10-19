import successImg from '../images/success.png';
import failImg from '../images/fail.png';
import React from 'react';

function InfoTooltip({ isResponseFail, isOpen, onClose }) {
  const srcImg = isResponseFail ? failImg : successImg;
  const title = isResponseFail
    ? 'Что-то пошло не так! Попробуйте ещё раз.'
    : 'Вы успешно зарегистрировались!';
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__exit-button" type="button" onClick={onClose} />
        <img
          className="popup__result-img"
          src={srcImg}
          alt="Результат запроса"
        />
        <p className="popup__title">{title}</p>

      </div>
    </div>
  );
}

export default InfoTooltip;