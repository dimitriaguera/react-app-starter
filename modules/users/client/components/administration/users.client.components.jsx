import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'
import { ADMIN_ROLE } from 'users/commons/roles'
import { get, put, del } from 'core/client/services/core.api.services'
import { getLocalToken } from 'users/client/services/users.storage.services'
import { hasRole } from 'users/client/services/users.auth.services'
import { setUsers } from 'users/client/redux/actions'
import { List, Confirm, Button } from 'semantic-ui-react'

class Users extends Component {

    constructor(){
        super();
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            users: [],
            modal: {
                open: false,
                name: '',
                index: null,
            },
        }
    }

    // Request API server on mounting component.
    componentWillMount(){
        const _self = this;
        this.props.fetchUsers().then( (data) => {
            if (data.success) {
                _self.setState({users: data.msg})
            }
        });
    }

    // Handle func when open Confirm Box.
    handleOpen( name, i ){
        this.setState({modal:{
            open:true,
            name: name,
            index: i,
        }});
    }

    // Handle for cancel Confirm Box.
    handleCancel() {
        this.setState({modal:{
            open:false,
            name: '',
            index: null,
        }});
    }

    // Handle for confirm Confirm Box.
    handleConfirm() {
        this.deleteUser( this.state.modal.name, this.state.modal.index );
        this.setState({modal:{
            open:false,
            name: '',
            index: null
        }});
    }

    // Prepair and call deleteUser props func.
    deleteUser( name, i ){
        const _self = this;
        this.props.deleteUser( name )
            .then(( data )=>{
            if ( data.success ) {
                const { users } = _self.state;
                const newUsers = update(users, {$splice: [[i, 1]]});
                _self.setState({ users:newUsers });
            }
        });
    }

    render(){

        // Get state and props properties.
        const { users, modal } = this.state;
        const { history, currentUser } = this.props;

        // Build user list.
        const userList = users.map((user, index)=>{
            return (
                <UserListItem key={user._id} user={user} currentUser={currentUser} index={index} history={history} handleOpen={this.handleOpen}/>
            );
        });

        return (
            <div>
                <List divided relaxed>
                    {userList}
                </List>
                <Confirm
                    open={ modal.open }
                    onCancel={ this.handleCancel }
                    onConfirm={ this.handleConfirm }
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(
            get( 'users' )
        ),
        deleteUser: (name) => dispatch(
            del( 'users/' + name )
        ),
    }
};

const mapStateToProps = state => {
    return {
        loading: state.apiStore.isFetching,
        currentUser: state.authenticationStore._user,
    }
};

const UsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

class UserListItem extends Component {

    shouldComponentUpdate( nextProps ) {
        return (
            // Re-render component if
            // User data or index change.
            ( nextProps.users !== this.props.users )||
            ( nextProps.index !== this.props.index )
        );
    }

    render() {
        const {user, index, handleOpen, history, currentUser} = this.props;
        const roles = user.roles.reduce((a, b) => {
            return `${a} ${b}`
        }, '');

        const deleteButton = () => {
            if ( hasRole(user, [ADMIN_ROLE]) && (currentUser.username === user.username) ) {
                return (
                    <Button disabled
                            basic
                            color='grey'
                            icon='delete'
                            circular />
                );
            } else {
                return (
                    <Button onClick={() => handleOpen(user.username, index)}
                            basic
                            color='grey'
                            icon='delete'
                            circular />
                );
            }
        };

        console.log('RENDER LIST');

        return (
            <List.Item>
                <List.Content floated='right'>
                    <Button onClick={() => history.push('/user/edit/'+user.username)} basic color='grey' icon='setting' circular/>
                    {deleteButton()}
                </List.Content>
                <List.Header><Link to={`/user/${user.username}`}>{user.username}</Link></List.Header>
                <List.Description>{roles}</List.Description>
            </List.Item>
        );
    }
}

export default UsersContainer