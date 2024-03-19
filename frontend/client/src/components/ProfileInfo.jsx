import PropTypes from 'prop-types';
import styles from './ProfileInfo.module.css';

const ProfileInfo = ({ info })=> {

    return (
        <header className={styles.profileInfo}>
            <img src={info.picture.url} alt={info.picture.alt} width="89" height="89" className={styles.profilePic} />
            <h1 className={styles.name}>{info.name}</h1>
            <p className={styles.location}>{info.location}</p>
            <p>{info.bio}</p>
        </header>
    )
}

ProfileInfo.propTypes = {
    info: PropTypes.shape({
        picture: PropTypes.shape({
            url: PropTypes.string,
            alt: PropTypes.string
        }),
        name: PropTypes.string,
        location: PropTypes.string,
        bio: PropTypes.string
    })
}

export default ProfileInfo;