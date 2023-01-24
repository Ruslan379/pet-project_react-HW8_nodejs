import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsOperations';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { selectAllContacts, selectLoading } from 'redux/contacts/contactsSelectors';
import { Spinner } from 'components/Spinner/Spinner';

import css from './ContactForm.module.css';



export const ContactForm = () => {
    const dispatch = useDispatch();

    const contacts = useSelector(selectAllContacts);
    // console.log("Contacts==>contacts:", contacts); //!

    const isLoading = useSelector(selectLoading);
    // console.log("ContactListItem==>isLoading:", isLoading); //!

    const handleSubmit = e => {
        e.preventDefault();

        const form = e.currentTarget;
        const name = form.elements.name.value;
        const number = form.elements.number.value;

        if (
            contacts.find(item => item.name.toLowerCase() === name.toLowerCase())
        ) {
            // alert(`${name} уже есть в контактах.`);
            toast.warning(`${name} уже есть в контактах.`);
            form.reset();
            return;
        }

        dispatch(addContact({ name, number }));
        form.reset();
        return;
    };



    return (
        <>
            <form
                className={css.Form}
                onSubmit={handleSubmit}
            >

                <label
                    className={css.FormLabel}
                >
                    {/* Name */}
                    {isLoading ? "Please wait..." : "Name"}
                    <br />
                    <input
                        className={css.FormInput}
                        id="inputName"
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    // value={nameValue}
                    // onChange={handleChange}
                    />
                </label>
                <br />

                <label className={css.FormLabel}>
                    {/* Number */}
                    {isLoading ? "..." : "Number"}
                    <br />
                    <input
                        className={css.FormInput}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    // value={numberValue}
                    // onChange={handleChange}
                    />
                </label>
                <br />

                <button
                    className={css.FormBtn}
                    type="submit"
                    disabled={isLoading}
                >
                    {/* Add contact */}
                    {isLoading ? <Spinner size="32">Add contact</Spinner> : "Add contact"}
                </button>
            </form>

            <ToastContainer autoClose={1500} theme={"colored"} />
        </>
    );
}





