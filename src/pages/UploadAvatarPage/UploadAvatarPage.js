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

import css from './UploadAvatarPage.module.css';


export default function UploadAvatarPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);
    console.log("formData;", formData); //!
    // dispatch(addContact({ name, phone }));
    navigate("/contacts", { replace: true });
  };



  // const form = document.getElementById("form");
  // form.addEventListener("submit", function (event) {
  //   event.preventDefault();
  //   const { image } = this.elements;
  //   console.log("image.value ==>", image.value); //!
  //   console.log("image.files[0] ==>", image.files[0]); //!
  //   const data = new FormData();
  //   data.append("image", image.files[0]);
  //   console.log("data;", data); //!
  // })



  return (
    <>
      <form
        id="form"
        // className={css.Form}
        onSubmit={handleSubmit}
      // encType="multipart/form-data"
      >

        <label className={css.FormLabel}
        >
          <input
            // className={css.FormInput}
            id="inputImage"
            type="file"
            name="file"
            multiple
          // required
          />
        </label>
        {/* <br /> */}

        <button
          // className={css.FormBtn}
          type="submit"
        // disabled={isLoading}
        >
          Отправить файл
        </button>
      </form>

      {/* <ToastContainer autoClose={1500} theme={"colored"} /> */}
    </>
  );
}
