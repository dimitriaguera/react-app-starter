import React, { Component } from 'react';
import { connect } from 'react-redux'
//import _ from 'lodash'

import ApiService from 'core/client/services/core.api.services'
import { hasRole } from 'users/client/services/users.auth.services'
import { getLocalToken } from 'users/client/services/users.storage.services'
import { ALL_ROLE, ADMIN_ROLE, DEFAULT_AUTH_ROLE } from 'users/commons/roles'
import { Form, Checkbox, Button } from 'semantic-ui-react'

class EditUser extends Component {

    constructor(){
        super();
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.state = {
            user: null,
            formRoles: {},
        };
    }

    // Make Form input controlled.
    handleCheckChange(e, data) {
        const value = data.checked;
        const name = data.name;

        this.setState((prevState) => {

            const state = Object.assign( {}, prevState );
            state.formRoles[name] = value;
            return state;
        });
    }

    // Request user to server.
    componentWillMount() {
        const _self = this;
        const name = _self.props.match.params.userName;
        this.props.fetchUser( name )
            .then( (data) => {
                _self.setState({
                    user: data.msg,
                    formRoles: setRoleArray( data.msg.roles ),
                })
            });
    }

    handleUpdateUser() {

        const _self = this;
        const { user, formRoles } = this.state;
        const name = _self.props.match.params.userName;

        const update = {
            roles: getRoleArray( formRoles ),
        };

        const body = JSON.stringify({
            roles:update.roles,
        });

        this.props.updateUser( name, body )
            .then( (data) => {
                _self.setState({user: _.merge( user, update )})
            });
    }

    render(){

        const { user } = this.state;
        const { currentUser } = this.props;

        if ( !!user ) {

            // Built role's choice checkboxes.
            const rolesForm = ALL_ROLE.map((role, index)=>{

                let props = {};

                // If default user role, can't be unchecked.
                if (role === DEFAULT_AUTH_ROLE) {
                    props.checked = true;
                    props.disabled = true;
                }

                // If user is currrent connected user and as admin role, can't be unchecked.
                else if ( role === ADMIN_ROLE && hasRole(user, [role]) && (currentUser.username === user.username)) {
                    props.checked = true;
                    props.disabled = true;
                }

                // If user has role, default check it.
                else if ( hasRole(user, [role]) ) {
                    props.defaultChecked = true;
                }

                return (
                    <Form.Field key={index}>
                        <Checkbox {...props} name={role} label={role} onChange={this.handleCheckChange}/>
                    </Form.Field>
                );
            });

            // Render form.
            return (
                <div>
                    <div>
                        <h1>Edit {user.username} account</h1>
                        <Form onSubmit={this.handleUpdateUser}>
                            {rolesForm}
                            <Button type='submit' content='Save' color='blue'/>
                        </Form>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.authenticationStore._user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: ( name ) => dispatch(
            ApiService.request( 'users/' + name, {
                token: getLocalToken(),
            })
        ),
        updateUser: ( name, update ) => dispatch(
            ApiService.request( 'users/' + name, {
                method: 'PUT',
                token: getLocalToken(),
                body: update,
            })
        ),
    }
};

const EditUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser);


// HELPER FUNCTION
function getRoleArray( obj ) {
    const roles = [];
    for ( let key in obj ) {
        if ( obj.hasOwnProperty(key) && (obj[key] === true) ) roles.push(key);
    }
    return roles;
}

function setRoleArray( array ) {
    const roles = {};
    for ( let i = 0; i < array.length; i++ ) {
        roles[array[i]] = true;
    }
    return roles;
}

export default EditUserContainer
