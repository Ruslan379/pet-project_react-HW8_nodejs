import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchContacts } from 'redux/contacts/contactsOperations';
import { selectLoading } from 'redux/contacts/contactsSelectors';

import { getFilter } from 'redux/filter/filterSelectors';

import { selectAllContacts } from 'redux/contacts/contactsSelectors';

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Loader } from 'components/Loader/Loader';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { DeleteAllContacts } from 'components/DeleteAllContacts/DeleteAllContacts';



export default function Contacts() {
    const dispatch = useDispatch();

    const isLoading = useSelector(selectLoading);
    // console.log("Contacts==>isLoading:", isLoading); //!

    const filter = useSelector(getFilter);
    // console.log("Contacts==>filter:", filter); //!

    const contacts = useSelector(selectAllContacts);
    // console.log("Contacts==>contacts:", contacts); //!


    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);



    //! Создание нового массива объектов из contacts с учетом значения поиска из filter
    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            (contact.name.toLowerCase()).includes(normalizedFilter),
        );
    };

    const visibleContacts = getVisibleContacts();
    const totalContacts = contacts.length;



    return (
        <Container>
            <ContactForm />

            <h2>Contacts</h2>
            <p>Total: {totalContacts}</p>

            {isLoading && <Loader />}

            {contacts.length > 0 && (
                <>
                    <Filter />

                    <ContactList
                        visibleContacts={visibleContacts}
                    />

                    {/* <DeleteAllContacts /> */}
                </>
            )}

            {contacts.length > 0 && !isLoading && <DeleteAllContacts />}

        </Container>
    );
}

// {contacts.length > 0 && !isLoading && (