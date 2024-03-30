import PropTypes from 'prop-types';
import styles from './CardLink.module.css';

const Link = ({ link }) => {
    return (
        <li className={styles.linkItem}>
            <a className={styles.link} href={link.url}>{link.name}</a>
        </li>
    )
}

Link.propTypes = {
    link: PropTypes.object
}

export default Link;