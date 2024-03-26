import PropTypes from 'prop-types';
import ProfileInfo from "./ProfileInfo";
import Links from "./Links";
import styles from './Card.module.css';

const Card = (props) => {
    const { data, picture } = props;

    return (
        <article aria-label="Profile card" className={styles.card}>
            <ProfileInfo info={data.info} picture={picture} />
            <Links data={data.links} />
        </article>
    )
}

Card.propTypes = {
    data: PropTypes.object,
    picture: PropTypes.object
}

export default Card;