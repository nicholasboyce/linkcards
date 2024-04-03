import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import LoginFormItem from '../components/LoginFormItem';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [reRender, setRerender] = useState(0);
    const [validity, setValidity] = useState(true);
    const navigate = useNavigate();

    const convertToJSON = (data) => {
        const json = {};

        data.forEach((value, key) => {
            if(!Reflect.has(json, key)) {
                json[key] = value;
            }
        });

        return JSON.stringify(json);
    }

    const validateForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        
        if (form.reportValidity()) {
            const csrfResponse = await fetch('/api/csrf');
            const csrf = await csrfResponse.json()
            const options = new Request('/api/login', {
                method: 'POST',
                headers: {
                    'x-csrf-token': csrf.token,
                    'Content-Type': 'application/json'
                },
                body: convertToJSON(data),
                credentials: 'include'
            });
            const response = await fetch(options);
            const status = response.status;
            if (status === 200) {
                console.log('success');
                navigate(`/${data.get('username')}`)
            } else {
                setValidity(false);
            }
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
                    <form action="/api/login" method="post" noValidate='novalidate' className={styles.loginForm} onSubmit={validateForm}>
                        <h1 className={styles.formHeading}>Sign in to your account</h1>
                        <LoginFormItem formValid={true} id='username' text='Username' type='text' length={3} name='username' />
                        <LoginFormItem formValid={validity} id='password' text='Password' type='password' length={5} name='password' />
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