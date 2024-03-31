import { useRef } from "react";
import styles from './LoginFormItem.module.css';

const LoginFormItem = ({ id, text, type, length, name }) => {

    const valid = useRef(true);
    const errorMessage= useRef('');
    const inputRef = useRef(null);

    const validateInput = () => {
        const input = inputRef.current;
        valid.current = input.validity.valid;
        if (!input.validity.valid) {
            if (input.validity.valueMissing) {
                errorMessage.current = `${text} is required`;
            } else if (input.validity.typeMismatch) {
                errorMessage.current = `Entered input needs to be a valid ${name}`;
            } else if (input.validity.tooShort) {
                errorMessage.current = `${text} needs to be at least ${length} characters long`;
            } else {
                errorMessage.current = `Invalid ${name}`;
            }
        } else {
            errorMessage.current = '';
        }
    }

    

    return (
        <p className={styles.loginFormItem}>
            <label htmlFor={id}>{text}</label>
            <input ref={inputRef} type={type} id={id} name={name} aria-describedby='loginFormError' required onChange={validateInput} onInvalid={(e) => e.preventDefault()} minLength={length}/>
            {!valid.current && <span className={styles.errorMessage} id='loginFormError' aria-live='polite'>{errorMessage.current}</span>}
        </p>
    )
}

export default LoginFormItem;