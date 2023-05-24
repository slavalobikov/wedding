import { ROUTES } from '../utils/const';
import Main from '../views/Main';
import Login from '../views/Login';
import Admin from '../views/Admin';

export const routes = [
  {
    path: ROUTES.MAIN,
    Component: Main,
  },
  {
    path: '/',
    Component: Main,
  },
  {
    path: ROUTES.LOGIN,
    Component: Login,
  },
  {
    path: ROUTES.ADMIN,
    Component: Admin,
  },
];
