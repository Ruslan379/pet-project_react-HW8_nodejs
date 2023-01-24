import { useAuth } from 'hooks';
import css from './Home.module.css'




export default function Home() {
    const { user, isLoggedIn } = useAuth();
    console.log("user", user); //!

    return (
        <div className={css.container}>
            <h1 className={css.title}>
                <span className={css.spanName} role="img" aria-label="Greeting icon">
                    💁 {isLoggedIn ? user.name : "Register or Log In"}
                    {/* {isLoading ? [<Spinner size="18" />, " Editing..."] : "Edit"} */}
                    <br />
                </span>
                Welcome to the HW-8
                <span className={css.spanWith}>
                    &nbsp;(with createAsyncThunk)
                </span>
            </h1>
        </div>
    );
}
// { user.name }