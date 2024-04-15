const FormBioItem = () => {
    return (
        <li className={styles.formItem}>
            <label htmlFor="username">Username: </label>
            <input id="username" name='username' type="text" placeholder={userData.username} disabled/>
        </li>
    )
}

export default FormBioItem;