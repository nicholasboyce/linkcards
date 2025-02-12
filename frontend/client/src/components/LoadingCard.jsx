import styles from './LoadingCard.module.css';

export const LoadingCard = () => {
    return (
    <>
        <main className={styles.main}>
            <div className={styles.card}>
                <div className={styles.profileInfo}>
                    <div className={styles.picture}></div>
                    <div className={styles.name}></div>
                    <div className={styles.location}></div>
                    <div className={styles.bio}></div>
                </div>
                <div className={styles.link}></div>
                <div className={styles.link}></div>
                <div className={styles.link}></div>
            </div>
        </main>
    </>
    );
};