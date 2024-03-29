import PropTypes from 'prop-types';
import imgUrl from '../assets/avatar-jessica.jpeg';
import Card from '../components/Card';
import { useParams, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';


const User = (props) => {

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
    
            setData(userData.data);
            // setPicture(userData.picture);
          } catch(error) {
            console.log(error);
          }
        }
    
        fetchUserData();
        return () => abortController.abort();
    }, [user]);

    console.log(user);

    return (
        <>
            <Card data={data} picture={picture}/>
            <Outlet />
        </>
    )
}

export default User;