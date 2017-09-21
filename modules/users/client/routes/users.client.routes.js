/**
 * Created by Dimitri Aguera on 21/09/2017.
 */
/**
 * Created by Dimitri Aguera on 21/09/2017.
 */
import { ADMIN_ROLE, USER_ROLE, INVITE_ROLE } from 'users/commons/roles'

import User from 'users/client/components/administration/user.client.components.jsx'
import EditUser from 'users/client/components/administration/edit.user.client.components.jsx'
import Account from 'users/client/components/administration/account.client.components.jsx'
import Users from 'users/client/components/administration/users.client.components.jsx'
import Login from 'users/client/components/authentication/login.client.components.jsx'
import Register from 'users/client/components/authentication/register.client.components.jsx'

export const routes = [
    {
        private: false,
        route: {
            path: '/register',
            exact: true,
            component: Register,
        },
        menu_link: {},
    },
    {
        private: false,
        route: {
            path: '/login',
            exact: true,
            component: Login,
        },
        menu_link: {},
    },
    {
        private: true,
        route: {
            path: '/users',
            roles: [ADMIN_ROLE],
            exact: true,
            component: Users,
        },
        menu_link: {},
    },
    {
        private: true,
        route: {
            path: '/user/edit/:userName',
            roles: [ADMIN_ROLE],
            component: EditUser,
        },
        menu_link: {},
    },
    {
        private: true,
        route: {
            path: '/account',
            component: Account,
        },
        menu_link: {},
    },
    {
        private: true,
        route: {
            path: '/user/:userName',
            component: User,
        },
        menu_link: {},
    },
];