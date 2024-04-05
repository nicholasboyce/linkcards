// import { useState } from 'react';
import styles from './EditForm.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EditForm = () => {
    const { user } = useParams();
    const [userData, setUserData] = useState(
    {
        username: '',
        picture: '',
        data: {
            info: {
                name: 'Jessica Randall',
                location: 'London, United Kingdom',
                bio: '"Front-end developer and avid reader."'
            },
            links: [
                {
                    id: 0,
                    name: 'Github',
                    url: '#'
                },
                {
                    id: 1,
                    name: 'Frontend Mentor',
                    url: '#'
                },
                {
                    id: 2,
                    name: 'Linkedin',
                    url: '#'
                },
                {
                    id: 3,
                    name: 'Twitter',
                    url: '#'
                },
                {
                    id: 4,
                    name: 'Instagram',
                    url: '#'
                }
            ]
        }
    });

    useEffect(() => {
        const abortController = new AbortController();
    
        const fetchUserData = async () => {
            try {
            const response = await fetch(`/api/users/${user}`, {
                signal: abortController.signal
            });
            const userDataResponse = await response.json();
    
            setUserData(userDataResponse);
            } catch(error) {
            console.log(error);
            }
        }
    
        fetchUserData();
        return () => abortController.abort();
    }, [user]);

    return (
        <>
        <main className={styles.main}>
        <form className={styles.form} action={`/api/users/${user}`}>
            <ul className={styles.formInputs}>
                <li className={styles.formItem}>
                    <label htmlFor="username">Username: </label>
                    <input id="username" name='username' type="text" placeholder={userData.username}/>
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" name='name' type="text" placeholder={userData.data.info.name} />
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" id="location" placeholder={userData.data.info.location} />
                </li>
                <li className={styles.formItem}>
                    <label htmlFor="bio">Bio: </label>
                    <input type="text" name="bio" id="bio" placeholder={userData.data.info.bio} />
                </li>
            </ul>
            <fieldset className={styles.formLinksGroup}>
                <legend>Edit Your Links</legend>
                <ul className={styles.formLinks}>
                    {
                        userData.data.links.map((link) => 
                            <li className={styles.formLink} key={link.id}>
                                <label htmlFor={link.id}>{link.name}:</label>
                                <input type="text" name={link.name} id={link.id} placeholder={link.url} />
                            </li>
                        )
                    }
                </ul>
            </fieldset>
        </form>
        </main>
        </>
    )
}

export default EditForm; 