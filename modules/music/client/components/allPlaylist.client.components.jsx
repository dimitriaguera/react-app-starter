import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { get, post } from 'core/client/services/core.api.services'
import socketServices from 'core/client/services/core.socket.services'
import MenuPlaylist from './menuPlaylist.client.components'
import { Item, Divider, Form, Message, Segment } from 'semantic-ui-react'

class AllPlaylist extends Component {

    constructor( props ) {
        super( props );
        this.socket = socketServices.getPublicSocket();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            allPlaylist: [],
            error: false,
            message: '',
            title:'',
        }
    }

    componentWillMount() {
        const _self = this;
        this.props.getAllPlaylist()
            .then( (data) => {
                if( data.success ){
                    _self.setState({ allPlaylist: data.msg });
                }
            });

        this.socket.on('save:playlist', (data) => {
            const apl = _self.state.allPlaylist.slice(0);
            apl.push(data);
            _self.setState({ allPlaylist: apl })
        });
    }

    // On unmount component, disconnect Socket.io.
    componentWillUnmount() {
        this.socket.disconnect();
        console.log("Disconnecting Socket as component will unmount");
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
        const { title } = this.state;
        this.props.createPlaylist({ title: title })
            .then( (data) => {
                if (!data.success) {
                    _self.setState({message: data.msg, error: true });
                } else {
                    _self.setState({error: false, title: ''});
                }
            });
    }

    render(){

        const { allPlaylist, error, message, title } = this.state;

        const playLists = allPlaylist.map( (item, i) => {
            return (
                <Segment key={i}>
                    <Item>
                        <Item.Content>
                            <Item.Extra><MenuPlaylist playlist={item} /></Item.Extra>
                            <Item.Header as="h3">
                                <Link to={`/playlist/${item.title}`}>{item.title}</Link>
                            </Item.Header>
                            <Item.Meta>{item.tracks.length} Tracks</Item.Meta>
                        </Item.Content>
                    </Item>
                </Segment>
            );
        });

        return (
            <div>
                <h1>All Playlists</h1>
                <Divider/>
                <Form error={error} onSubmit={this.submitForm}>
                    <Message error content={message}/>
                    <Form.Input
                        action={{ color: 'teal', labelPosition: 'left', icon: 'list layout', content: 'Add' }}
                        actionPosition='left'
                        placeholder='Playlist Title...'
                        name='title'
                        value={title}
                        onChange={this.handleInputChange}
                    />
                </Form>
                <Item.Group>
                    {playLists}
                </Item.Group>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createPlaylist: ( item ) => dispatch(
            post( 'playlist', {data: item} )
        ),
        getAllPlaylist: ( item ) => dispatch(
            get( 'allPlaylist' )
        ),
    }
};

const AllPlaylistContainer = connect(
    null,
    mapDispatchToProps
)(AllPlaylist);

export default AllPlaylistContainer