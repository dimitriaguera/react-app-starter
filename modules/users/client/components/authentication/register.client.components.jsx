import React, { Component } from 'react'
import store from 'core/client/redux/store'
import { Form, Button, Divider, Header, Message } from 'semantic-ui-react'
import { registerNewUser } from 'users/client/redux/actions'


class Register extends Component {

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            username:'',
            password:'',
            isRegister: false,
            error: false,
            message:'',
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

        store.dispatch(registerNewUser(this.state)).then( ( data ) => {
            console.log(data);
            _self.setState({
                isRegister: data.success,
                message: data.msg,
                error: !data.success,
                password: '',
            })
        });
        e.preventDefault();
    }

    render() {

        const { username, password, isRegister, message, error } = this.state;
        const { history } = this.props;

        return (
            <div>
                {
                    isRegister ?
                        (<div>
                            <Header>Register</Header>
                            <Message header={`Welcome ${username} !`} content="Registration successful" color='blue' />
                        </div>)
                        :
                        (<div>
                            <Header>Register</Header>
                            <Form error={error} onSubmit={this.submitForm}>
                                <Message error content={message}/>
                                <Form.Group>
                                    <Form.Input required label='Account name' placeholder='Name' name='username' value={username} onChange={this.handleInputChange} />
                                    <Form.Input required label='Password' type='password' placeholder='Password' name='password' value={password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Button type='submit' content='Submit' color='blue'/>
                            </Form>
                            <Divider horizontal>Or</Divider>
                            <Button onClick={(e) => history.push('/login')} fluid>Sign in</Button>
                        </div>)}
            </div>
        )
    }
}

export default Register