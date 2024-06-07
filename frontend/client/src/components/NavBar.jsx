import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuthStatus, useAuthStatusUpdate } from '../AuthContext';

const NavBar = () => {
    const { authenticated, user } = useAuthStatus();
    const authController = useAuthStatusUpdate();

    const navigate = useNavigate();

    const handleSignOut = (e) => {
        e.preventDefault();
        authController.logout();
        navigate('/');
    }

    console.log(authenticated);

    return (
    <nav className={styles.nav}>
        <Link to='/' className={styles.logo}>LinkCards</Link>
        {
            authenticated ?
            <button className={styles.button} onClick={handleSignOut}>Sign Out</button> :
            <Link to='/login' className={styles.button}>Sign In</Link>
        }
    </nav>
    );
};

export default NavBar;