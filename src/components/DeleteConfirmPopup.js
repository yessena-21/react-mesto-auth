
import React from 'react';
import PopupWithForm from "./PopupWithForm";

function DeleteConfirm({ card, isOpen, onClose, onDeleteConfirm }) {

    function handleSubmit(e) {
        e.preventDefault();

        onDeleteConfirm(
            card,
        );
    }
    return (
        <PopupWithForm
            name="delete-confirm"
            title="Вы уверены"
            buttonText="да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    )
}

export default DeleteConfirm
