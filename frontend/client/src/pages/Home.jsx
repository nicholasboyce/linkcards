import styles from './Home.module.css';
import imgUrl from '../assets/product-screenshot.png';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className={styles.home} role="presentation">
            <nav className={styles.nav}>
                <Link to='/' className={styles.logo}>LinkCards</Link>
                <Link to='/login' className={styles.button}>Sign In</Link>
            </nav>
            <main className={styles.main}>
                <hgroup className={styles.heroHeader}>
                    <h1 className={styles.heroHeaderTitle}>Found your missing link.</h1>
                    <p className={styles.heroHeaderBody}>Make it easy for yourself to share all your socials in one place. One easy link for all your links!</p>
                    <Link to='/register' className={styles.button}>Register</Link>  
                </hgroup>
                <img className={styles.productImage} src={imgUrl} alt="Example image of link card." />
            </main>
        </div>
    )
}

export default Home;