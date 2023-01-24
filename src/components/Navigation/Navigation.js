// import { NavLink } from 'react-router-dom'; //? если import css from './Navigation.module.css';

import { useAuth } from 'hooks';

// import css from './Navigation.module.css';
import { Link } from './Navigation.styled.js'; //! "components/Navigation/Navigation.styled";




//? import css from './Navigation.module.css';
export const Navigation = () => {
    const { isLoggedIn } = useAuth();

    return (
        <nav>
            <Link to="/" end>
                Home
            </Link>
            {isLoggedIn && (
                <>
                    <Link to="/contacts">
                        Contacts
                    </Link>

                    <Link to="/upload">
                        Upload Contacts
                    </Link>
                </>
            )}
        </nav>
    );
};


//? import css from './Navigation.module.css';
// export const Navigation = () => {
//     const { isLoggedIn } = useAuth();

//     return (
//         <nav>
//             <NavLink className={css.link} to="/">
//                 Home
//             </NavLink>
//             {isLoggedIn && (
//                 <NavLink className={css.link} to="/contacts">
//                     Contacts
//                 </NavLink>
//             )}
//         </nav>
//     );
// };