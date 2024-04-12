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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fieldsets = form.querySelectorAll('fieldset');
        const links = [];
        for (const fieldset of fieldsets) {
            const link = {
                id: fieldset.id,
                name: fieldset.elements[0].value || fieldset.elements[0].name, 
                url: fieldset.elements[1].value || fieldset.elements[1].name
            }
            links.push(link);
        }
        const data = {
            data: {
                info: {
                    name: form.querySelector('#name').value || userData.data.info.name,
                    bio: form.querySelector('#bio').value || userData.data.info.bio,
                    location: form.querySelector('#location').value || userData.data.info.location,
                },
                links
            }
        };

        const csrfResponse = await fetch('/api/csrf');
        const csrf = await csrfResponse.json()
        const options = new Request(`/api/users/${user}`, {
            method: 'PATCH',
            headers: {
                'x-csrf-token': csrf.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const response = await fetch(options);
        (response.status === 200) && console.log(await response.json());
    };

    return (
        <>
        <main className={styles.main}>
        <form className={styles.form} action='/' aria-labelledby='edit-form-heading' onSubmit={handleSubmit}>
            <h1 className="visually-hidden" id='edit-form-heading'>User Info Editing Form</h1>
            <ul className={styles.formInputs}>
                <li className={styles.formItem}>
                    <label htmlFor="username">Username: </label>
                    <input id="username" name='username' type="text" placeholder={userData.username} disabled/>
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
            {/* <fieldset className={styles.formLinksGroup}>
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
            </fieldset> */}
            {
                userData.data.links.map((link, index) => 
                    <fieldset key={link.id} id={link.id}>
                        <legend>{`Edit Link #${index + 1}: `}<span className='visually-hidden'>{link.name}</span></legend>
                        <p className={styles.formItem}>
                            <label htmlFor={`${link.id}-Name`}>Name:</label>
                            <input type="text" name={link.name} id={`${link.id}-Name`} placeholder={link.name}/>
                        </p>
                        <p className={styles.formItem}>
                            <label htmlFor={`${link.id}-Link`}>Link:</label>
                            <input type="text" name={link.url} id={`${link.id}-Link`} placeholder={link.url} />
                        </p>
                    </fieldset>
                )
            }
            <button type="submit">Submit</button>
        </form>
        </main>
        </>
    )
}

export default EditForm; 