import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuthStatus, useAuthStatusUpdate } from '../AuthContext';

const NavBar = () => {
    const status = useAuthStatus();
    const authController = useAuthStatusUpdate();

    const navigate = useNavigate();

    const handleSignOut = (e) => {
        e.preventDefault();
        authController.logout();
        navigate('/');
    }

    console.log(status.authenticated);

    return (
    <nav className={styles.nav}>
        <Link to='/' className={styles.logo}>LinkCards</Link>
        {
            status.authenticated ?
            <button className={styles.button} onClick={handleSignOut}>Sign Out</button> :
            <Link to='/login' className={styles.button}>Sign In</Link>
        }
    </nav>
    );
};

export default NavBar;