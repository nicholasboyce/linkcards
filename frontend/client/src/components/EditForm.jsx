import { useEffect, useState } from "react";
import EditFormItem from "./EditFormItem";
import styles from '../pages/EditFormPage.module.css';

const EditForm = ({ handleSubmit, links, username, name, location, bio }) => {

    const [linksShown, setLinksShown] = useState(links);
    const [nameShown, setNameShown] = useState(name);
    const [locationShown, setLocationShown] = useState(location);
    const [bioShown, setBioShown] = useState(bio);


    useEffect(() => {
        setLinksShown(links);
    }, [links]);

    const handleRemoval = (link) => {
        const newLinksShown = linksShown.filter((keep) => keep.id !== link.id);
        setLinksShown(newLinksShown);
    }

    const addNew = (e) => {
        e.preventDefault();
        const newLink =
            {
                id: crypto.randomUUID()
            }
        const newLinksShown = linksShown.concat(newLink);
        setLinksShown(newLinksShown);
    }

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
                    <input id="name" name='name' type="text" value={nameShown} onChange={(e) => setNameShown(e.target.value)} required/>
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" id="location" value={locationShown} onChange={(e) => setLocationShown(e.target.value)} required/>
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="bio">Bio: </label>
                    <input type="text" name="bio" id="bio" value={bioShown} onChange={(e) => setBioShown(e.target.value)} required/>
                </li>
            </ul>
            {
                linksShown.map((link, index) => {
                    return link.name ? <EditFormItem key={link.id} link={link} index={index} solo={linksShown.length === 1} handleRemoval={() => handleRemoval(link)} /> : <EditFormItem key={link.id} index={index} handleRemoval={() => handleRemoval(link)} solo={linksShown.length === 1} />
                }
                )
            }
            <menu className={styles.buttonMenu}>
                {linksShown.length < 5 &&
                    <li>
                        <button onClick={addNew}>Add Link</button>
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