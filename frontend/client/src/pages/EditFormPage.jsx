import styles from './EditFormPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import EditForm from '../components/EditForm';
import { useAuthStatus } from '../AuthContext';

const EditFormPage = () => {
    const { user } = useParams();
    const status = useAuthStatus();
    const navigate = useNavigate();
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
                name: fieldset.elements[0].value, 
                url: fieldset.elements[1].value
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

    if (status.user !== user) {
        navigate(`/${user}`);
    } else {
        return (
            <>
            <div className={styles.page}>
                <NavBar />
                <main className={styles.main}>
                    <EditForm handleSubmit={handleSubmit} links={userData.data.links} username={userData.username} location={userData.data.info.location} name={userData.data.info.name} bio={userData.data.info.bio} />
                </main>
            </div>
            </>
        )
    }

}

export default EditFormPage; 