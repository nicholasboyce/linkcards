import { useEffect } from 'react';
import imgUrl from './assets/avatar-jessica.jpeg';
import Card from './components/Card';
import { Route, Routes } from 'react-router-dom';

function App() {

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users', {
          signal: abortController.signal
        });
        const userData = await response.json();

        console.log(userData);
      } catch(error) {
        console.log(error);
      }
    }

    fetchUserData();
    return () => abortController.abort();
  }, []);

  const picture = {
    url: imgUrl,
    alt: 'A profile picture'
  }
  
  const data = {
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

  console.log(data);

  return (
    <Routes>
      <Card data={data} picture={picture}/>
    </Routes>
  )
}

export default App
