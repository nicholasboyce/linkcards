import styles from './Home.module.css';
import imgUrl from '../assets/product-screenshot.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate('/register');
    }

    const navigateToLogin = () => {
        navigate('/login');
    }

    return (
        <div className={styles.home} role="presentation">
            <nav className={styles.nav}>
                <p className={styles.logo}><a href="">LinkCards</a></p>
                <button className={styles.button} onClick={navigateToLogin}>Sign In</button>
            </nav>
            <main className={styles.main}>
                <hgroup className={styles.heroHeader}>
                    <h1 className={styles.heroHeaderTitle}>Found your missing link.</h1>
                    <p className={styles.heroHeaderBody}>Make it easy for yourself to share all your socials in one place. One easy link for all your links!</p>
                    <button className={styles.button} onClick={navigateToRegister}>Register</button>  
                </hgroup>
                <img className={styles.productImage} src={imgUrl} alt="Example image of link card." />
            </main>
        </div>
    )
}

export default Home;