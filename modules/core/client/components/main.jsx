import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from 'users/client/components/authorization/privateRoute.client.components.jsx';
import { Container } from 'semantic-ui-react'

import { ADMIN_ROLE, USER_ROLE, INVITE_ROLE } from 'users/commons/roles'

import Home from 'home/client/components/home.client.components.jsx';
import User from 'users/client/components/administration/user.client.components.jsx';
import EditUser from 'users/client/components/administration/edit.user.client.components.jsx';
import Account from 'users/client/components/administration/account.client.components.jsx';
import Users from 'users/client/components/administration/users.client.components.jsx';
import Login from 'users/client/components/authentication/login.client.components.jsx';
import Register from 'users/client/components/authentication/register.client.components.jsx';
import NotFound from './404.jsx'

//import test from './test.scss'
// Stylesheets
require('./test.scss');

const Main = () => (
        <Container>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <PrivateRoute exact roles={[ADMIN_ROLE]} path='/users' component={Users}/>
                <PrivateRoute roles={[ADMIN_ROLE]} path='/user/edit/:userName' component={EditUser}/>
                <PrivateRoute exact path='/account' component={Account}/>
                <PrivateRoute path='/user/:userName' component={User}/>
                <Route component={NotFound} />
            </Switch>
         </Container>
);

export default Main