import imgUrl from '../assets/avatar-jessica.jpeg';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './User.module.css';
import { useAuthStatus } from '../AuthContext';


const User = () => {
    const status = useAuthStatus();

    const [data, setData] = useState(
    {
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
    });
    // const [picture, setPicture] = useState({});
    const { user } = useParams();

    const picture = {
        url: imgUrl,
        alt: 'A profile picture'
    }

    useEffect(() => {
        const abortController = new AbortController();
    
        const fetchUserData = async () => {
          try {
            const response = await fetch(`/api/users/${user}`, {
              signal: abortController.signal
            });
            const userData = await response.json();
    
            userData && setData(userData.data);
            // setPicture(userData.picture);
          } catch(error) {
            console.log(error);
          }
        }
    
        fetchUserData();
        return () => abortController.abort();
    }, [user]);

    // console.log(user, status.authenticated);

    return (
        <div role='presentation' className={styles.user}>
            <NavBar />
            <Card data={data} picture={picture}/>
        </div>
    )
}

export default User;