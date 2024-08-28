import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import RegisterFormItem from '../components/RegisterFormItem';
import { useMultistepForm } from '../useMultistepForm';
import { useState } from 'react';

const INITIAL_DATA = {
    username: '',
    password: '',
    name: '',
    location: '',
    bio: '',
    'link-1-name': '',
    'link-2-name': '',
    'link-1': '',
    'link-2': ''
};

const Register = () => {
    const [userData, setData] = useState(INITIAL_DATA);
    const updateFields = (fields) => {
        setData(prev => {
            return {...prev, ...fields};
        });
    };
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
            <RegisterFormItem id='username' text='Username' type='text' length={3} name='username' initial={userData.username} updateFields={updateFields} />
            <RegisterFormItem id='password' text='Password' type='password' length={5} name='password' initial={userData.password} updateFields={updateFields} />
        </>,
        <>
            <RegisterFormItem id='name' text='Name' type='text' length={3} name='name' initial={userData.name} updateFields={updateFields}/>
            <RegisterFormItem id='location' text='Location' type='text' length={3} name='location' initial={userData.location} updateFields={updateFields}/>
            <RegisterFormItem id='bio' text='Bio' type='text' length={3} name='bio' initial={userData.bio} updateFields={updateFields}/>
        </>,
        <>
            <RegisterFormItem id='link-1-name' text='Link #1 Name' type='text' length={3} name='link-1-name' updateFields={updateFields} initial={userData['link-1-name']}/>
            <RegisterFormItem id='link-1' text='Link #1 URL' type='text' length={3} name='link-1' updateFields={updateFields} initial={userData['link-1']}/>
        </>,
        <>
            <RegisterFormItem id='link-2-name' text='Link #2 Name' type='text' length={3} name='link-2-name' updateFields={updateFields} initial={userData['link-2-name']}/>
            <RegisterFormItem id='link-2' text='Link #2' type='text' length={3} name='link-2' updateFields={updateFields} initial={userData['link-2']}/>
        </>
    ]);

    const validateForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        if (form.reportValidity()) {
            if (isLastStep) {
                const transferData = {
                    username: userData.username,
                    password: userData.password,
                    data: {
                        info: {
                            name: userData.name,
                            location: userData.location,
                            bio: userData.bio
                        },
                        links: [
                            {
                                name: userData['link-1-name'],
                                url: userData['link-1']
                            }, 
                            {
                                name: userData['link-2-name'],
                                url: userData['link-2']
                            }
                        ]
                    }
                };
                const csrfResponse = await fetch('/api/csrf');
                const csrf = await csrfResponse.json();
                fetch('/api/users', {
                    method: 'POST',
                    body: JSON.stringify(transferData),
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