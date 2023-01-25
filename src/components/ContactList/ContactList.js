// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ContactListItem } from '../ContactListItem/ContactListItem';


import css from './ContactList.module.css';



export const ContactList = ({ visibleContacts }) => {
    return (
        <ul className={css.ContactList}>
            {/* {visibleContacts.map(({ id, name, number }) => ( */}
            {visibleContacts.map(({ _id, name, phone }) => (
                <ContactListItem
                    key={_id}
                    id={_id}
                    name={name}
                    // number={number} //??
                    phone={phone}
                />
            ))}
        </ul>
    );
};


ContactList.propTypes = {
    visibleContacts: PropTypes.array.isRequired,
};