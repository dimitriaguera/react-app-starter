import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'core/client/services/core.api.services'
import { playItem, addPlaylistItem } from 'music/client/redux/actions'
import PlaylistItem from 'music/client/components/playlistitem.client.components'
import { List, Divider } from 'semantic-ui-react'

class Playlist extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            playlist: {
                title: '',
                tracks: [],
            },
        }
    }

    componentWillMount() {
        const _self = this;
        const title = _self.props.match.params.title;
        const { history } = _self.props;

        this.props.getPlaylist(title)
            .then( (data) => {
                if ( !data.success ) {

                    return history.push('/not-found');
                }
                _self.setState({
                    playlist: data.msg,
                })
            });
    }

    handlerReadFile( item ) {

        return (e) => {
            this.props.readFile( item );
            e.preventDefault();
        }
    }

    render(){

        const { playlist } = this.state;

        const itemsList = playlist.tracks.map( (item, i) => {
            return <PlaylistItem key={i} item={item} onPlay={this.handlerReadFile(item)} />
        });

        return (
            <div>
                <h5>Playlist</h5>
                <h1>{playlist.title}</h1>
                <Divider/>
                <List divided relaxed>
                    {itemsList}
                </List>
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
        getPlaylist: ( title ) => dispatch(
            get( `playlist/${title}` )
        ),
        addPlaylistItem: ( item ) => dispatch(
            addPlaylistItem( item )
        ),
        readFile: ( item ) => dispatch(
            playItem( item )
        ),
    }
};

const PlaylistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist);

export default PlaylistContainer