import React, { Component } from 'react';
import { connect } from 'react-redux'

import ApiService from 'core/client/services/core.api.services'
import AuthService from 'users/client/services/users.auth.services'

class User extends Component {

    constructor(){
        super();
        this.state = {
            user: null,
        };
    }

    // Request user to server.
    componentWillMount(){
        const _self = this;
        const name = _self.props.match.params.userName;

        this.props.fetchUser( name )
            .then( (data) => {
                _self.setState({ user: data.msg })
            });
    }

    render(){

        const { user } = this.state;

        return (
            <div>
            { !!user && (
                <div>
                    <h1>{user.username}'s User Page</h1>
                </div>
             )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: ( name ) => dispatch(
            ApiService.request( 'users/' + name, {
                token: AuthService.getStoredToken(),
            })
        )
    }
};

const UserContainer = connect(
    null,
    mapDispatchToProps
)(User);

export default UserContainer