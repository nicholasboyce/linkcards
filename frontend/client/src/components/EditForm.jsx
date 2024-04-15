import { useEffect, useState } from "react";
import EditFormItem from "./EditFormItem";
import styles from '../pages/EditFormPage.module.css';

const EditForm = ({ handleSubmit, links, username, name, location, bio }) => {

    const [linksShown, setLinksShow] = useState(links);

    useEffect(() => {
        setLinksShow(links);
    }, [links]);

    const [nameShown, setNameShown] = useState(name);
    const [usernameShown, setUsernameShown] = useState(username);
    const [locationShown, setLocationShown] = useState(location);
    const [bioShown, setBioShown] = useState(bio);

    const handleRemoval = (link) => {
        console.log(link.name);
        console.log('Click! It\'s all so thrilling!');
        const newLinksShown = linksShown.filter((keep) => keep.id !== link.id);
        setLinksShow(newLinksShown);
    }

    // const addNew = () => {
    //     setLinksShow()
    // }

    return (
        <form className={styles.form} action='/' aria-labelledby='edit-form-heading' onSubmit={handleSubmit}>
            <h1 className="visually-hidden" id='edit-form-heading'>User Info Editing Form</h1>
            <ul className={styles.formInputs}>
                <li className={styles.formItem}>
                    <label htmlFor="username">Username: </label>
                    <input id="username" name='username' type="text" value={username} disabled/>
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" name='name' type="text" value={name} onChange={(e) => setNameShown(e.target.value)} required/>
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" id="location" value={location} onChange={(e) => setLocationShown(e.target.value)} required/>
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="bio">Bio: </label>
                    <input type="text" name="bio" id="bio" value={bio} onChange={(e) => setBioShown(e.target.value)} required/>
                </li>
            </ul>
            {linksShown.length === 0 ?
                 <EditFormItem /> :
                linksShown.map((link, index) => {
                    return <EditFormItem key={link.id || index} link={link} index={index} solo={linksShown.length === 1} handleRemoval={() => handleRemoval(link)} />
                }
                )
            }
            <menu className={styles.buttonMenu}>
                {linksShown.length < 6 &&
                    <li>
                        <button>Add Link</button>
                    </li>
                }
                <li>
                    <button type="submit">Submit</button>
                </li>
            </menu>
        </form>
    );
};

export default EditForm;