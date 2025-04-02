import React, { useState, useEffect } from 'react';
import { EActionTypes } from 'src/@types/types';
import styles from './Modal.module.scss';

interface IModalProps {
    type: EActionTypes;
    name?: string;
    onClose: () => void;
    onSubmit: (name: string) => void;
}

const Modal: React.FC<IModalProps> = ({ type, name = '', onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState<string>(name);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setInputValue(name || '');
        setError('');
    }, [name]);

    const validateInput = (): boolean => {
        if (type !== EActionTypes.DELETE && inputValue.trim() === '') {
            setError("Field can't be empty");
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = () => {
        if (validateInput()) {
            onSubmit(type !== EActionTypes.DELETE ? inputValue : '');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        } else if (event.key === 'Escape') {
            onClose();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (error) setError('');
    };

    const modalTitle = () => {
        switch (type) {
            case EActionTypes.ADD:
                return 'Add';
            case EActionTypes.EDIT:
                return 'Rename';
            case EActionTypes.DELETE:
                return `Do you want to delete ${name}?`;
            default:
                return '';
        }
    };

    return (
        <div
            className={styles.modal__overlay}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={styles.modal__content}>
                <h2 id="modal-title">{modalTitle()}</h2>
                {type !== EActionTypes.DELETE && (
                    <>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter node name"
                            className={`${styles.modal__input} ${error && styles.modal__inputError}`}
                        />
                        {error && <div className={styles.modal__error}>{error}</div>}
                    </>
                )}
                <div className={styles.modal__buttonGroup}>
                    <button
                        onClick={handleSubmit}
                        className={styles.modal__submitButton}
                        aria-disabled={type === EActionTypes.DELETE && !name}
                    >
                        {type === EActionTypes.DELETE ? 'Delete' : 'Save'}
                    </button>
                    <button onClick={onClose} className={styles.modal__cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;