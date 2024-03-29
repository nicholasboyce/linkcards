// import { useState } from 'react';
import styles from './EditForm.module.css';
import { useParams } from 'react-router-dom';

const EditForm = () => {
    // const [links, setLinks] = useState(3);
    const { user } = useParams();
    return (
        <>
        <form className={styles.form} action={`/api/users/${user}`}>
            <ul className={styles.formInputs}>
                <li className={styles.formItem}>
                    <label htmlFor="username">Username: </label>
                    <input id="username" name='username' type="text" />
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" name='name' type="text" />
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" id="location" />
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="bio">Bio: </label>
                    <input type="text" name="bio" id="bio" />
                </li>
                <li className={styles.formItem}></li>
                <li className={styles.formItem}></li>
            </ul>
        </form>
        </>
    )
}

export default EditForm; 