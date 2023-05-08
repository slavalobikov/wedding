import {ROUTES} from "../utils/const";
import Main from "../views/Main";
import Login from "../views/Login";

export const routes = [
    {
        path: ROUTES.MAIN,
        Component: Main
    },
    {
        path: ROUTES.LOGIN,
        Component: Login
    }
]