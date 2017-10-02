import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'core/client/services/core.api.services'
import { addPlaylistItem } from 'music/client/redux/actions'
import PlaylistItem from 'music/client/components/playlistitem.client.components'
import Audio from 'music/client/components/audio.client.components'
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

        const _self = this;
        return (e) => {
            _self.setState({itemReading: item});
            e.preventDefault();
        }
    }

    render(){

        const { playlist } = this.props;
        const { itemReading } = this.state;

        const itemsList = playlist.map( (item, i) => {
            return <PlaylistItem key={i} item={item.item} onPlay={this.handlerReadFile(item)} />
        });

        return (
            <div>
                <h1>Playlist</h1>
                <Divider/>
                <Audio visibility={!!itemReading.path} item={itemReading.item} src={itemReading.path}/>
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
    }
};

const PlaylistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist);

export default PlaylistContainer