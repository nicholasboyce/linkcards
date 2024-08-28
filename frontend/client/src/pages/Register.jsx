import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import RegisterFormItem from '../components/RegisterFormItem';
import { useMultistepForm } from '../useMultistepForm';

const Register = () => {
    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next 
    } = useMultistepForm([  
        <>
            <RegisterFormItem id='username' text='Username' type='text' length={3} name='username' />
            <RegisterFormItem id='password' text='Password' type='password' length={5} name='password' />
        </>,
        <>
            <RegisterFormItem id='name' text='Name' type='text' length={3} name='name' />
            <RegisterFormItem id='location' text='Location' type='text' length={3} name='location' />
            <RegisterFormItem id='bio' text='Bio' type='text' length={3} name='bio' />
        </>,
        <>
            <RegisterFormItem id='link-1' text='Link #1' type='text' length={3} name='link-1' />
            <RegisterFormItem id='link-2' text='Link #2' type='text' length={3} name='link-2' />
        </>
    ]);
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

    const validateForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        
        if (form.reportValidity()) {
            if (isLastStep) {
                const csrfResponse = await fetch('/api/csrf');
                const csrf = await csrfResponse.json();
                fetch('/api/users', {
                    method: 'POST',
                    body: convertToJSON(data),
                    headers: {
                        'x-csrf-token': csrf.token,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
            } else {
                next();
            }
        }
    }

    return (
        <>
        <div role='presentation' className={styles.registerPage}>
            <div className={styles.formBlock} role='presentation'>
                <div className={styles['form-top-wrapper']}>
                    <Link to='/' className={styles.logo}>LinkCards</Link> 
                    <div className='steps-number'>{currentStepIndex + 1} / {steps.length}</div>
                </div>
                <main className={styles.main}>
                    <form action="/api/users" method="post" className={styles.registerForm} onSubmit={validateForm}>
                        <h1 className={styles.formHeading}>Create your LinkCards account</h1>
                        {step}
                        <div className={styles["button-wrapper"]}>
                            {!isFirstStep && <button type="button" className={styles.registerFormSubmit} onClick={back}>Back</button>}
                            {!isLastStep && <button type="submit" className={`${styles.registerFormSubmit} ${styles.next}`}>Next</button>}
                            {isLastStep && <button type="submit" className={styles.registerFormSubmit}>Create account</button>}
                        </div>
                    </form>
                    <p>Have an account? <Link to='/login' className={styles.loginLink}>Sign in</Link></p>
                </main>
            </div>
        </div>
        </>
    )
}

export default Register;