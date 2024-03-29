import styles from './Login.module.css';

const Login = () => {
    return (
        <>
        <div role='presentation' className={styles.loginPage}>
            <div className={styles.formBlock} role='presentation'>
                <p className={styles.logo}><a href="">LinkCards</a></p>
                <main className={styles.main}>
                    <form action="/api/users" method="post" noValidate className={styles.loginForm}>
                        <h1 className={styles.formHeading}>Sign in to your account</h1>
                        <p className={styles.loginFormItem}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" required/>
                        </p>
                        <p className={styles.loginFormItem}>
                            <label htmlFor="password">Password</label>
                            <input type="text" id="password" name="password" required/>
                        </p>
                        <button type="submit" className={styles.loginFormSubmit}>Continue</button>
                    </form>
                    <p>Don&apos;t have an account? <a href="/register" className={styles.registerLink}>Sign up</a></p>
                </main>
            </div>
        </div>
        </>
    )
}

export default Login;