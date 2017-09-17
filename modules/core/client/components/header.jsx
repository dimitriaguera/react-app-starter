import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Loader } from 'semantic-ui-react'
import { logoutUser } from 'users/client/redux/actions'
import AuthService from 'users/client/services/users.auth.services'
import { ADMIN_ROLE, USER_ROLE, INVITE_ROLE } from 'users/commons/roles'

const Header = ({ isAuthenticated, user, logoutHandler, loading, fetching }) => {

    const homeItem = () => <Menu.Item as={Link} to='/'>Home</Menu.Item>;
    const usersItem = () => <Menu.Item as={Link} to='/users'>Users</Menu.Item>;
    const loginItem = () => (
        <Menu.Menu position='right'>
            <Menu.Item as={Link} to='/Login'>Login</Menu.Item>
        </Menu.Menu>
    );

    const accountItem = () => (
        <Menu.Menu position='right'>
            <Dropdown text={user.username} pointing className='link item'>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/account'>My account</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="a" href='#' onClick={ logoutHandler }>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    );

    return (
        <header>
            <Menu as='nav' stackable>

              {/* Static links */}
              {homeItem()}

                {/* Authorized policies links */}
              {AuthService.allowDisplayItem(usersItem, user, [ADMIN_ROLE])}
              {AuthService.allowDisplayItem(accountItem, user)}

              {/* Conditional links */}
              {!isAuthenticated && loginItem()}

            </Menu>
            <Loader active={loading || fetching}/>
        </header>
)};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authenticationStore.isAuthenticated,
        user: state.authenticationStore._user,
        loading: state.apiStore.isFetching,
        fetching: state.authenticationStore.isFetching,
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        logoutHandler: e => {
            e.preventDefault();
            dispatch(logoutUser());
        }
    }
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer