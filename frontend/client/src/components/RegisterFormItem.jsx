import { useRef, useState } from "react";
import styles from './RegisterFormItem.module.css';

const RegisterFormItem = ({ id, text, type, length, name, initial, updateFields }) => {

    const inputRef = useRef(null);
    const [valid, setValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const validateInput = (e) => {
        const input = inputRef.current;
        setValid(input.validity.valid);
        // console.log({ name: e.target.value });
        updateFields({ [name]: e.target.value });
        if (!input.validity.valid) {
            if (input.validity.valueMissing) {
                setErrorMessage(`${text} is required`);
            } else if (input.validity.typeMismatch) {
                setErrorMessage(`Entered input needs to be a valid ${name}`);
            } else if (input.validity.tooShort) {
                setErrorMessage(`${text} needs to be at least ${length} characters long`);
            } else {
                setErrorMessage(`Invalid ${name}`);
            }
        } else {
            setErrorMessage('');
        }
    }

    return (
        <p className={styles.registerFormItem}>
            <label htmlFor={id}>{text}</label>
            <input ref={inputRef} type={type} id={id} name={name} aria-describedby='registerFormError' required onChange={validateInput} onInvalid={(e) => e.preventDefault()} minLength={length} value={initial} />
            {!valid && <span className={styles.errorMessage} id='registerFormError' aria-live='polite'>{errorMessage}</span>}
        </p>
    );
}

export default RegisterFormItem;