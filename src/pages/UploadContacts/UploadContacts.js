// import axios from 'axios';
// import { useState } from 'react';
// import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { fetchContactsFromMmockapiIo, addContact } from 'redux/contacts/contactsOperations';
// import { getUploadContacts } from 'redux/uploadContacts/uploadContactsSelectors';
import { selectLoading, selectAllContacts, getUploadContacts } from 'redux/contacts/contactsSelectors';

import { Container } from 'components/Container/Container';
import { Loader } from 'components/Loader/Loader';
import { UploadContactsList } from 'components/UploadContactsList/UploadContactsList';

import css from './UploadContacts.module.css';


export default function UploadContacts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectLoading);
  // console.log("Contacts==>isLoading:", isLoading); //!

  const uploadContacts = useSelector(getUploadContacts);
  console.log("UploadContacts==>uploadContacts:", uploadContacts); //!

  const contacts = useSelector(selectAllContacts);
  console.log("Contacts==>contacts:", contacts); //!

  const totalUploadContacts = uploadContacts.length;


  // useEffect(() => {
  //   dispatch(fetchContactsFromMmockapiIo());
  // }, [dispatch]);

  //! добавлен сразу в onClick ==> Upload contacts from mockapi.io
  // const handlUploadContacts = () => dispatch(fetchContactsFromMmockapiIo());

  const handlAddUploadContacts = () => {
    for (const uploadContact of uploadContacts) {
      const name = uploadContact.name;
      const number = uploadContact.number;
      dispatch(addContact({ name, number }));
    };
    navigate("/contacts", { replace: true });
  };




  return (
    <Container>
      <button
        type="button"
        className={uploadContacts.length === 0 ? css.UploadContactsBtn : css.hide}
        // onClick={handlUploadContacts}
        onClick={() => dispatch(fetchContactsFromMmockapiIo())}
        disabled={uploadContacts.length > 0}
      >
        Upload contacts from mockapi.io
      </button>
      <br />

      {isLoading && <Loader />}

      {uploadContacts.length > 0 && !isLoading && (
        <>
          <p className={css.TotalUploadContacts}>Total upload contacts from mockapi.io: {totalUploadContacts}</p>
          <UploadContactsList uploadContacts={uploadContacts} />
        </>
      )}

      <br />
      <button
        type="button"
        className={uploadContacts.length > 0 ? css.AddUploadContactsBtn : css.hide}
        onClick={handlAddUploadContacts}
        disabled={uploadContacts.length === 0}
      >
        Add upload contacts from mockapi.io in Contacts List
      </button>
    </Container>
  );
}
