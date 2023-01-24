// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ContactListItem } from '../ContactListItem/ContactListItem';


import css from './ContactList.module.css';



export const ContactList = ({ visibleContacts }) => {
    return (
        <ul className={css.ContactList}>
            {visibleContacts.map(({ id, name, number }) => (
                <ContactListItem
                    key={id}
                    id={id}
                    name={name}
                    number={number}
                />
            ))}
        </ul>
    );
};


ContactList.propTypes = {
    visibleContacts: PropTypes.array.isRequired,
};