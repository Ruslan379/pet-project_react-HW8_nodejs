import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';





//! axios defaults baseURL
axios.defaults.baseURL = 'http://localhost:3000/api'; //??


//! GET @ /contacts
export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            // const { data } = await axios.get('/contacts'); //?  //?? 
            // console.log("contacts/fetchAll==>data:", data); //! //??
            const { data: { contacts } } = await axios.get('/contacts'); //???
            // const { contacts } = data; //??  //???
            console.log("contacts/fetchAll == >data.contacts:", contacts); //!
            // return data; //?
            // return data.contacts; //??
            return contacts; //??  //???
        } catch (error) {
            console.log(error); //!
            toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 404" ? "Нет такой коллекции пользователей" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


//! POST @ /contacts
export const addContact = createAsyncThunk(
    'contacts/addContact',
    // async ({ name, number }, thunkAPI) => {
    async ({ name, phone }, thunkAPI) => {
        try {
            console.log("contacts/addContact==>name:", name); //! 
            console.log("contacts/addContact==>phone:", phone); //! 
            // const { data } = await axios.post('/contacts', { name, number });
            const { data } = await axios.post('/contacts', { name, phone });
            console.log("contacts/addContact ==> data:", data); //!
            console.log("contacts/addContact ==> data.contact:", data.contact); //!
            // return data; //??
            return data.contact;
        } catch (error) {
            console.log(error); //!
            toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 400" ? "Ошибка при создании контакта" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


//! DELETE @ /contacts/:id
export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
        try {
            // console.log("contacts/deleteContact==>contactId:", contactId); //!
            await axios.delete(`/contacts/${contactId}`);
            // const response = await axios.delete(`/contacts/${contactId}`); //!!!  Ошибка Репеты
            // console.log("deleteContact==>response.data", response.data); //!!!  пустой объект
            // return response.data; //!!!  Ошибка Репеты
            return contactId;
        } catch (error) {
            console.log(error); //!
            toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 404" ? "Нет такой коллекции пользователей" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


//! PATCH @ /contacts/:id
export const editContact = createAsyncThunk(
    'contacts/editContact',
    // async ({ id, newName, newNumber }, thunkAPI) => { //! 1-й вариант
    // async ({ id: contactId, name, number }, thunkAPI) => { //! 2-й вариант
    async ({ id: contactId, name, phone }, thunkAPI) => { //! 2-й вариант
        // async (credentials, thunkAPI) => { //! 3-й вариант
        try {
            // console.log("contacts/editContact==>contactId:", contactId); //! 1-й и 2-й вариант
            // console.log("contacts/editContact==>name:", name); //! 2-й вариант
            // console.log("contacts/editContact==>number:", number); //! 2-й вариант
            // console.log("contacts/editContact==>credentials:", credentials); //! 3-й вариант
            // const response = await axios.patch(`/contacts/${id}`, { name: newName, number: newNumber }); //! 1-й вариант
            const { data } = await axios.patch(`/contacts/${contactId}`, { name, phone }); //! 2-й вариант
            // const response = await axios.patch(`/contacts/${credentials.id}`, { name: credentials.name, number: credentials.number }); //! 3-й вариант
            // console.log("editContact==>response.data", response.data); //!
            console.log("contacts/contacts/editContact ==> data:", data); //!
            console.log("contacts/contacts/editContact ==> data.contact:", data.contact); //!
            return data.contact;
        } catch (error) {
            console.log(error); //!
            toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 500" ? "Не удалось обновить контакт" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//! Front: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJkOWI4ZTk2NTEyNDAwMTU2NjRlZWQiLCJpYXQiOjE2NzQ1NjcxODZ9.uCeXpHTZFsIYGYPTM2xFuYAJTHX3hsgtqzhIOAIkJlA
//? Back: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWY0M2MwZTU4YTUxZTk1YTJjOWZmYiIsImVtYWlsIjoiNzc3QHVrci51YSIsImlhdCI6MTY3MjczNjU5OH0.PRqM0mjhkFR-oZ9rg_rEVPd5dIYSIxIt5AroRBeI9sw


//? GET @ /contacts - получить ВСЕ контакты с mockapi.io
export const fetchContactsFromMmockapiIo = createAsyncThunk(
    'contacts/fetchContactsFromMmockapiIo',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('https://6326c1ee70c3fa390f9bc51d.mockapi.io/contacts');
            // const { data } = await axios.get('http://localhost:3000/api/contacts'); //??
            // const { data } = await axios.get('http://192.168.0.3:3000/api/contacts'); //??
            console.log("contacts/fetchContactsFromMmockapiIo==>data:", data); //!
            console.log("contacts/fetchContactsFromMmockapiIo==>data.contacts:", data.contacts); //!
            return data;
            // return data.contacts; //??
        } catch (error) {
            console.log(error); //!
            toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 404" ? "Нет такой коллекции пользователей" : error.message}`, { position: "top-center", autoClose: 2000 });
            return rejectWithValue(error.message);
        }
    },
);

//? DELETE @ /contacts/:id - удалить контакт с mockapi.io по его id
export const deleteContactFromMmockapiIo = createAsyncThunk(
    'contacts/deleteContactFromMmockapiIo',
    async (contactId, thunkAPI) => {
        try {
            // console.log("contacts/deleteContactFromMmockapiIo==>contactId:", contactId); //!
            await axios.delete(`https://6326c1ee70c3fa390f9bc51d.mockapi.io/contacts/${contactId}`);
            return contactId;
        } catch (error) {
            console.log(error); //!
            toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 404" ? "Нет такой коллекции пользователей" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);




// export const AddUploadContacts = createAsyncThunk(
//     'contacts/AddUploadContacts',
//     async (_, { rejectWithValue }) => {
//         try {
//             const uploadContacts = await axios.get('https://6326c1ee70c3fa390f9bc51d.mockapi.io/contacts');
//             console.log("uploadContactsOperations-axiosGet ==> uploadContacts:", uploadContacts.data); //!
//             return uploadContacts.data;
//         } catch (error) {
//             console.log(error);
//             toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
//             return rejectWithValue(error.message);
//         }
//     },
// );