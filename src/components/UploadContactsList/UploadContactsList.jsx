import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteContactFromMmockapiIo } from 'redux/contacts/contactsOperations';

import css from 'components/UploadContactsList/UploadContactsList.module.css' 




export const UploadContactsList = ({ uploadContacts }) => {
  const dispatch = useDispatch();

  // const handleDeleteContact = () => dispatch(deleteContactFromMmockapiIo(id));
  const handleDeleteContact = id => dispatch(deleteContactFromMmockapiIo(id));

return (
  <ul className={css.ContactList}>
    {uploadContacts.map(({ id, name, number }) => (
      <li
        key={id}
        className={css.ContactListItem}
      >
        <p
          className={css.ContactListText}>{name}:
          <span
            className={css.ContactListNumber}
          > {number}
          </span>
        </p>
        <button
          type="button"
          className={css.ContactListBtn}
          onClick={() => handleDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
)};


UploadContactsList.propTypes = {
  uploadContacts: PropTypes.array.isRequired
  // onDeleteTodo: PropTypes.func.isRequired,
};


