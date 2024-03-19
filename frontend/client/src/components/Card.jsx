import PropTypes from 'prop-types';
import ProfileInfo from "./ProfileInfo";
import Links from "./Links";
import styles from './Card.module.css';

const Card = (props) => {
    const { data } = props;

    return (
        <article aria-label="Profile card" className={styles.card}>
            <ProfileInfo info={data.info} />
            <Links data={data.links} />
        </article>
    )
}

Card.propTypes = {
    data: PropTypes.object
}

export default Card;