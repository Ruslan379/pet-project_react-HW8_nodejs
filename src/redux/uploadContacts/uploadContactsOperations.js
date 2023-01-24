import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
// import * as contactsAPI from 'services/mockapi_io-api';

import { toast } from 'react-toastify';



export const fetchContactsFromMmockapiIo = createAsyncThunk(
    'uploadContacts/fetchAllContactsMmockapiIo',
    async (_, { rejectWithValue }) => {
        try {
            const uploadContacts = await axios.get('https://6326c1ee70c3fa390f9bc51d.mockapi.io/contacts');
            console.log("uploadContactsOperations-axiosGet ==> uploadContacts:", uploadContacts.data); //!
            return uploadContacts.data;
        } catch (error) {
            console.log(error);
            toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
            return rejectWithValue(error.message);
        }
    },
);



// export const addOneContactToMmockapiIo = createAsyncThunk(
//     'items/axiosPost',
//     async (addNewContact, { rejectWithValue }) => {
//         try {
//             const addItem = await contactsAPI.axiosPostAddContact(addNewContact);
//             console.log("itemsOperations-axiosPost ==> addItem:", addItem); //!
//             return addItem;
//         } catch (error) {
//             console.log(error);
//             toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
//             return rejectWithValue(error.message);
//         }
//     },
// );



// export const deleteOneContactFromMmockapiIo = createAsyncThunk(
//     'items/axiosDelete',
//     async (contactId, { rejectWithValue }) => {
//         try {
//             const deleteItem = await contactsAPI.axiosDeleteContact(contactId);
//             console.log("itemsOperations-axiosDelete ==> deleteItem:", deleteItem); //!
//             return contactId;
//         } catch (error) {
//             console.log(error);
//             toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
//             return rejectWithValue(error.message);
//         }
//     },
// );