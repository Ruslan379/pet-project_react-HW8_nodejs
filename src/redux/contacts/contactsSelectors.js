// export const selectLoading = state => state.contacts.loading; //! Ошибка Репеты
export const selectLoading = state => state.contacts.isLoading;


// export const selectFilter = state => state.contacts.filter; //! перенесен в отдельный reducer

export const selectAllContacts = state => state.contacts.items;

export const getUploadContacts = state => state.contacts.uploadContacts;