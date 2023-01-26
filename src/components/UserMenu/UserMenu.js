import { useDispatch } from 'react-redux';

import { logOut } from 'redux/auth/authOperations';
import { useAuth } from 'hooks';

import defaultAvatar from 'icons/default-avatar.png';
import css from './UserMenu.module.css';

export const UserMenu = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    console.log("user:", user); //!

    return (
        <div className={css.wrapper}>
            <img className={css.avatar} src={defaultAvatar} alt="" width="32" />
            <p className={css.userName}><span className={css.welcome}>Welcome, </span> {user.name} ({user.email})</p>
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
