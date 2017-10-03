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
            itemReading: {},
        }
    }

    componentWillMount() {
    }

    handlerReadFile( item ) {

        return (e) => {
            this.props.readFile( item );
            e.preventDefault();
        }
    }

    render(){

        const { playlist } = this.props;

        const itemsList = playlist.map( (item, i) => {
            return <PlaylistItem key={i} item={item} onPlay={this.handlerReadFile(item)} />
        });

        return (
            <div>
                <h1>Playlist</h1>
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
        playlist: state.playlistStore.list,
    }
};

const mapDispatchToProps = dispatch => {
    return {
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