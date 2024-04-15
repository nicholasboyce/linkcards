import { useState } from 'react';
import styles from './EditFormItem.module.css';

const EditFormItem = ({ link, index, solo, handleRemoval }) => {

    const removeLink = async (e) => {
        e.preventDefault();
        handleRemoval();
        console.log('After prop fxn called');
    }

    if (!(link && link.name)) {
        const [linkName, setLinkName] = useState('');
        const [linkURL, setLinkURL] = useState('');

        return (
            <fieldset className={styles.fieldSet}>
                <legend>{`Edit Link #${index + 1}: `}<span className='visually-hidden'>Add New</span></legend>
                <p className={styles.formItem}>
                    <label htmlFor={`Link-${index + 1}-Name`}>Name:</label>
                    <input type="text" name='Name' id={`Link-${index + 1}-Name`} value={linkName} onChange={(e) => setLinkName(e.target.value)} required/>
                </p>
                <p className={styles.formItem}>
                    <label htmlFor={`Link-${index + 1}-URL`}>Link:</label>
                    <input type="text" name='Link' id={`Link-${index + 1}-URL`} value={linkURL} onChange={(e) => setLinkURL(e.target.value)} required/>
                </p>
            </fieldset>
        )
    } else {
        const [linkName, setLinkName] = useState(link.name);
        const [linkURL, setLinkURL] = useState(link.url);

        return (
            <fieldset id={link.id} className={styles.fieldSet}>
                <legend>{`Edit Link #${index + 1}: `}<span className='visually-hidden'>{link.name}</span></legend>
                <p className={styles.formItem}>
                    <label htmlFor={`${link.id}-Name`}>Name:</label>
                    <input type="text" name={link.name} id={`${link.id}-Name`} value={linkName} onChange={(e) => setLinkName(e.target.value)} />
                </p>
                <p className={styles.formItem}>
                    <label htmlFor={`${link.id}-Link`}>Link:</label>
                    <input type="text" name={link.url} id={`${link.id}-Link`} value={linkURL} onChange={(e) => setLinkURL(e.target.value)} />
                </p>
                {!solo && <button aria-label={`Remove Link #${index + 2}: ${link.name}`} className={styles.test} onClick={removeLink}>-</button>}
            </fieldset>
        )
    }
};

export default EditFormItem;