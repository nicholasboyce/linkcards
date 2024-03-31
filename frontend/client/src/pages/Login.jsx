import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import LoginFormItem from '../components/LoginFormItem';

const Login = () => {

    const [reRender, setRerender] = useState(0);

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

    const validateForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        
        if (form.reportValidity()) {
            fetch('/login', {
                method: 'POST',
                body: convertToJSON(data)
            });
        } else {
            setRerender(reRender =>  (reRender + 1) % 2);
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
                        <LoginFormItem id='username' text='Username' type='text' length={3} name='username' />
                        <LoginFormItem id='password' text='Password' type='password' length={5} name='password' />
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