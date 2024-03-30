import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {

    const [valid, setValid] = useState(true);

    const convertToJSON = (data) => {
        const json = {};

        data.forEach((value, key) => {
            if(!Reflect.has(json, key)) {
                json[key] = value;
                return;
            }
        });

        return JSON.stringify(json);
    }

    const validateInput = (e) => {
        e.preventDefault();
        const input = e.target;

        if (!input.validity.valid) {
            console.log('woohoo');
        }
    }

    const validateForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        
        // if(!form.reportValidity()) {
        //     setValid(false);
        //     console.log('YIKES!');
        //     return;
        // }
        
        if (form.reportValidity()) {
            fetch('/login', {
                method: 'POST',
                body: convertToJSON(data)
            });
        } else {
            setValid(false);
        }
    }

    return (
        <>
        <div role='presentation' className={styles.loginPage}>
            <div className={styles.formBlock} role='presentation'>
                <Link to='/' className={styles.logo}>LinkCards</Link>
                <main className={styles.main}>
                    <form action="/api/users" method="post" noValidate='novalidate' className={styles.loginForm} onSubmit={validateForm}>
                        <h1 className={styles.formHeading}>Sign in to your account</h1>
                        <p className={styles.loginFormItem}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" aria-describedby='loginFormError' required onInvalid={validateInput}/>
                            {!valid && <span className={styles.errorMessage} id='loginFormError' aria-live='polite'>Invalid username</span>}
                        </p>
                        <p className={styles.loginFormItem}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required onInvalid={validateInput}/>
                        </p>
                        <button type="submit" className={styles.loginFormSubmit}>Continue</button>
                    </form>
                    <p>Don&apos;t have an account? <Link to='/register' className={styles.registerLink}>Sign up</Link></p>
                </main>
            </div>
        </div>
        </>
    )
}

export default Login;