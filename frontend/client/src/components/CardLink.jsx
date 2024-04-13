import PropTypes from 'prop-types';
import styles from './CardLink.module.css';

const CardLink = ({ link }) => {
    return (
        <li className={styles.linkItem}>
            <a className={styles.link} href={link.url}>{link.name}</a>
        </li>
    )
}

CardLink.propTypes = {
    link: PropTypes.object
}

export default CardLink;