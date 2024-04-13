import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
    <nav className={styles.nav}>
        <Link to='/' className={styles.logo}>LinkCards</Link>
        <Link to='/login' className={styles.button}>Sign In</Link>
    </nav>
    );
};

export default NavBar;