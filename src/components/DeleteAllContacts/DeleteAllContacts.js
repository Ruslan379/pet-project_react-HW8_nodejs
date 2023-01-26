import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";

import { deleteContact } from 'redux/contacts/contactsOperations';
// import { fetchContacts } from 'redux/contacts/contactsOperations'; //??
import { selectLoading, selectAllContacts } from 'redux/contacts/contactsSelectors';

import { Container } from 'components/Container/Container';
// import { Spinner } from 'components/Spinner/Spinner';

import css from './DeleteAllContacts.module.css';


export function DeleteAllContacts() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const isLoading = useSelector(selectLoading);
  // console.log("DeleteAllContacts==>isLoading:", isLoading); //!


  // console.log("DeleteAllContacts==>isDeleting:", isDeleting); //!


  const contacts = useSelector(selectAllContacts);
  // console.log("Contacts==>contacts:", contacts); //!





  const handlDeleteAllContacts = () => {
    for (const contact of contacts) {
      // const id = contact.id;
      const id = contact._id;
      dispatch(deleteContact(id));
      // dispatch(fetchContacts()); //??
    };
    // navigate("/contacts", { replace: true });
  };




  return (
    <Container>
      <button
        type="button"
        className={css.DeleteAllContactsBtn}
        onClick={handlDeleteAllContacts}
        disabled={isLoading}
      >
        Delete all Contacts
        {/* {isLoading ? [<Spinner size="18" />, " Deleting all Contacts..."] : "Delete all Contacts"} */}
      </button>
    </Container>
  );
}
