import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from 'users/client/redux/actions'
import { Form, Button, Divider, Header } from 'semantic-ui-react'

class Login extends Component {

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            username:'',
            password:'',
            redirectToReferrer: false,
        };
    }

    handleInputChange(e) {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    submitForm(e) {

        const _self = this;

        this.props.handleSubmit(this.state).then( () =>
            _self.setState({redirectToReferrer: true})
        );
        e.preventDefault();
    }

    render(){

        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer, username, password } = this.state;
        const { history } = this.props;

        if ( redirectToReferrer ) {
            console.log('LOGIN CALLED - REDIRECT');
            return (
                <Redirect to={from}/>
            )
        }

        console.log('LOGIN CALLED - PAS REDIRECT');
        return(
            <div>
                <Header>Sign In</Header>
                <Form onSubmit={this.submitForm}>
                    <Form.Group>
                    <Form.Input required placeholder='Name' name='username' value={username} onChange={this.handleInputChange} />
                    <Form.Input required type='password' placeholder='Password' name='password' value={password} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button type='submit' content='Submit' color='blue'/>
                </Form>
                <Divider horizontal>Or</Divider>
                <Button onClick={(e) => history.push('/register')} fluid>Sign Up Now</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: ( creds ) => dispatch(loginUser(creds))
    }
};

const LoginContainer = connect(
    null,
    mapDispatchToProps
)(Login);

export default LoginContainer