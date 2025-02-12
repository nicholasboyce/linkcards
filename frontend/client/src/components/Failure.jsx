import styles from './LoadingCard.module.css';
import { useNavigate } from 'react-router-dom';

const Failure = () => {
    const nav = useNavigate();
    return (
        <>
        <main className={styles.main} onClick={() => nav('/')}>
            <div className={styles.card}>
                <p className={styles.error}>Sorry! There was an error! Return to the home page.</p>
            </div>
        </main>
        </>
    );
};

export default Failure;