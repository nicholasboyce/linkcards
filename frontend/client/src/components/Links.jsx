import PropTypes from 'prop-types';
import CardLink from "./CardLink";
import styles from './Links.module.css';

const Links = ({ data }) => {
    const links = data;
    return (
        <ul className={styles.list}>
            {links.map(link => <CardLink key={link.id} link={link}/>)}
        </ul>
    )
}

Links.propTypes = {
    data: PropTypes.array
}

export default Links;