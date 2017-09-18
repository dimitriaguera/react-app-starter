import React, { Component } from 'react';
import { connect } from 'react-redux'

import { get } from 'core/client/services/core.api.services'
import { getLocalToken } from 'users/client/services/users.storage.services'

class Account extends Component {

    constructor(){
        super();
        this.state = {
            user: null,
        };
    }

    componentWillMount(){
        const _self = this;
        this.props.fetchAccount()
            .then( (data) => {
                _self.setState({ user: data.msg })
            });
    }

    render(){

        const { user } = this.state;
        const userInfo = () => {
            if ( user ) {
                return (
                    <div>
                        <h1>{user.username}'s Account</h1>
                    </div>
                );
            }
            return null;
        };

        return userInfo();
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAccount: () => dispatch(
            get( 'account' )
        )
    }
};

const AccountContainer = connect(
    null,
    mapDispatchToProps
)(Account);

export default AccountContainer