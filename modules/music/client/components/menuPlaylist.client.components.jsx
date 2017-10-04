import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, post } from 'core/client/services/core.api.services'
import { playPlaylist, playItem, pauseState, playState } from 'music/client/redux/actions'
import { Button } from 'semantic-ui-react'

class MenuPlaylist extends Component {

    onPlay() {

        const _self = this;
        const pl = _self.props.playlist;

        return (e) => {

            if ( _self.props.playingList.pl === pl ) {
                _self.props.play();
            }
            else {
                _self.props.onPlay({
                    pl: pl,
                    onPlayIndex: 0,
                });
            }
        }
    };

    onPause() {
        const _self = this;
        return (e) => {
            _self.props.onPause();
        }
    }

    onNext() {
        const _self = this;
        const { nextTracks, playingList } = _self.props;
        const { onPlayIndex, pl } = playingList;

        return (e) => {
            nextTracks({
                onPlayIndex: onPlayIndex + 1,
                pl: pl,
            });
        }
    }

    onPrev() {
        const _self = this;
        const { nextTracks, playingList } = _self.props;
        const { onPlayIndex, pl } = playingList;

        return (e) => {
            nextTracks({
                onPlayIndex: onPlayIndex - 1,
                pl: pl,
            });
        }
    }

    onShuffle(e) {

    }

    render(){

        const { playingList, playlist, isPaused } = this.props;
        const { onPlayIndex, pl } = playingList;

        // Test if menu linked with active playlist.
        const isActive = playingList.pl && (playingList.pl.title === playlist.title);
        const color = isActive ? 'blue' : 'grey';
        const disable = ( !playlist.tracks.length );

        const playPauseBtn = () => {
            // If active playlist and on play, display Pause button.
            if ( isActive && !isPaused ) return <Button disabled={disable} onClick={this.onPause()} icon='pause' />;
            // Else display Play button.
            else return  <Button disabled={disable} onClick={this.onPlay()} icon='play' />;
        };

        const leftBtn = () => {
            if ( isActive ) {
                const disabled = ( onPlayIndex === 0 );
                return <Button onClick={this.onPrev()} disabled={disabled} icon='left chevron'/>;
            }
            return null;
        };

        const rightBtn = () => {
            if ( isActive ) {
                const disabled = ( onPlayIndex + 1 === pl.tracks.length );
                return <Button onClick={this.onNext()} disabled={disabled} icon='right chevron'/>;
            }
            return null;
        };

        return (
            <Button.Group color={color} size="mini">
                {leftBtn()}
                {playPauseBtn()}
                {/*<Button disabled onClick={this.onShuffle} icon='shuffle' />*/}
                {rightBtn()}
            </Button.Group>
        );
    }
}

const mapStateToProps = state => {
    return {
        playingList: state.playlistStore.playingList,
        isPaused: state.playlistStore.pause,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPlay: ( item ) => dispatch(playPlaylist(item)),
        onPause: ( item ) => dispatch(pauseState()),
        play: () => dispatch(playState()),
        nextTracks: ( item ) => dispatch(
            playPlaylist( item )
        ),
    }
};

const MenuPlaylistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPlaylist);

export default MenuPlaylistContainer