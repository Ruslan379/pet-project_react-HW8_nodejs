import { useDispatch } from 'react-redux';

import { logOut } from 'redux/auth/authOperations';
import { useAuth } from 'hooks';

// import defaultAvatar from 'icons/default-avatar.png'; //?
import css from './UserMenu.module.css';

// const BASE_URL = 'https://contact-book-backend52.onrender.com/'; //! так работает только с обновлением аватарки

export const UserMenu = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const defaultAvatar = user.avatarURL;
    // const defaultAvatar = `${BASE_URL}${user.avatarURL}`; //! так работает только с обновлением аватарки
    console.log("user:", user); //!
    console.log("defaultAvatar:", defaultAvatar); //!

    return (
        <div className={css.wrapper}>
            <p className={css.welcome}>Welcome, </p>
            <img className={css.avatar} src={defaultAvatar} alt="" width="32" />
            {/* <p className={css.userName}><span className={css.welcome}>Welcome, </span> {user.name} ({user.email})</p> */}
            <p className={css.userName}> {user.name} <span className={css.userEmail}>({user.email})</span></p>
            <button
                className={css.btnLogout}
                type="button"
                onClick={() => dispatch(logOut())}
            >
                Logout
            </button>
        </div>
    );
};
