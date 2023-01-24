import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

/*
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * - Otherwise render the component
 * 
 * - Если маршрут ограниченный (Public), и юзер залогинен, рендерит  <Navigate> to redirectTo
 * - В противном случае рендерит КОМПОНЕНТ
 */

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
