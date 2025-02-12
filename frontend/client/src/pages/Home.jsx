import styles from './Home.module.css';
import imgUrl from '../assets/product-screenshot.png';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/jessica1');
    };

    return (
        <div className={styles.home} role="presentation">
            <NavBar />
            <main className={styles.main}>
                <hgroup className={styles.heroHeader}>
                    <h1 className={styles.heroHeaderTitle}>Found your missing link.</h1>
                    <p className={styles.heroHeaderBody}>Make it easy for yourself to share all your socials in one place. One easy link for all your links!</p>
                    <Link to='/register' className={styles.button}>Register</Link>  
                </hgroup>
                <img className={styles.productImage} onClick={handleClick} src={imgUrl} alt="Example image of link card." />
            </main>
        </div>
    )
}

export default Home;