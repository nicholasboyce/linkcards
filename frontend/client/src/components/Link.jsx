import PropTypes from 'prop-types';
import styles from './Link.module.css';

const Link = ({ link }) => {
    return (
        <li className={styles.link}>
            <a href={link.url}>{link.name}</a>
        </li>
    )
}

Link.propTypes = {
    link: PropTypes.object
}

export default Link;