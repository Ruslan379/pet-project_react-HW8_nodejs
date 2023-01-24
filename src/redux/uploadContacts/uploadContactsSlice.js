import { createSlice } from '@reduxjs/toolkit';
// import { logOut } from 'redux/auth/authOperations';
import { fetchContactsFromMmockapiIo } from './uploadContactsOperations';

const initialItems = [];

const uploadContactsSlice = createSlice({
    name: 'uploadContacts',
    initialState: initialItems,
    extraReducers: {
        [fetchContactsFromMmockapiIo.fulfilled]: (_, { payload }) => {
            const newUploadContacts = payload.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    number: item.phone
                };
            });
            console.log("addContactsFromAxios ==> newUploadContacts:", newUploadContacts); //!
            return newUploadContacts;
        },

        // [logOut.fulfilled](state) {
        //     state.items = [];
        //     state.error = null;
        //     state.isLoading = false;
        // },
    },
});

export const uploadContactsReducer = uploadContactsSlice.reducer;
