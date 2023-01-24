import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks';

/*
 * - If the route is private and the user is logged in, render the component
 * - Otherwise render <Navigate> to redirectTo
 * 
 * - Если маршрут ПРИВАТНЫЙ (частный), и юзер залогинен, рендерит КОМПОНЕНТ
 * - В противном случае рендерит <Navigate> to redirectTo 
 */

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn, isRefreshing } = useAuth();
    const shouldRedirect = !isLoggedIn && !isRefreshing;
    return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
