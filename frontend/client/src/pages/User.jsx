import imgUrl from '../assets/avatar-jessica.jpeg';
import Card from '../components/Card';
import { LoadingCard } from '../components/LoadingCard';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import styles from './User.module.css';
import { wrapPromise } from '../utils/wrapPromise';
import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Failure from '../components/Failure';


const User = () => {
    // const [picture, setPicture] = useState({});
    const { user } = useParams();

    const picture = {
        url: imgUrl,
        alt: 'A profile picture'
    }

    const fetchUserData = async () => {
        const response = await fetch(`/api/users/${user}`);
        const userData = await response.json();
        return userData;
    }

    const resourcePromise = wrapPromise(fetchUserData());

    return (
        <div role='presentation' className={styles.user}>
            <NavBar />
            <ErrorBoundary fallback={<Failure />}>
                <Suspense fallback={<LoadingCard />}>
                    <Card picture={picture} resource={resourcePromise}/>
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

export default User;