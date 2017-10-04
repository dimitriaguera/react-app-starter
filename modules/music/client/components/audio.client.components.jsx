import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'core/client/services/core.api.services'
import { playItem, playPlaylist, playState, pauseState } from 'music/client/redux/actions'
import ReactAudioPlayer from 'react-audio-player'

class Audio extends Component {

    constructor( props ) {
        super( props );
        this.onEndedHandler = this.onEndedHandler.bind(this);
        this.handlerPause = this.handlerPause.bind(this);
        this.handlerPlay = this.handlerPlay.bind(this);
    }

    /**
     * Switch to next Track on current playing track ends.
     * @param e
     */
    onEndedHandler(e) {

        const { playingList, nextTracks } = this.props;

        // Test if playlist context.
        if ( playingList ) {

            const { onPlayIndex, pl } = playingList;

            // Test if not the last track.
            if ( onPlayIndex + 1 === pl.tracks.length ) return;
            nextTracks({
                onPlayIndex: onPlayIndex + 1,
                pl: pl,
            });
        }
    }

    /**
     * Dispatch pause state.
     * @param e
     */
    handlerPause(e) {
        const { isPaused, pause } = this.props;
        if ( !isPaused ) pause();
    }

    /**
     * Dispatch play state.
     * @param e
     */
    handlerPlay(e) {
        const { isPaused, play } = this.props;
        if ( isPaused ) play();
    }


    render(){

        const { onPlay, isPaused } = this.props;

        // Remotes events from redux store state.
        // If pause state, pause audio element.
        if ( isPaused ) this.rap.audioEl.pause();
        // If no-pause state, and audio element exist, play audio element.
        else if ( this.rap && onPlay.src ) this.rap.audioEl.play();

        return (
            !!onPlay.src &&
            <div style={{width:'100%', position: 'fixed', bottom: '0', lineHeight: '0'}}>
                <div style={{lineHeight: '1.5'}}>{onPlay.name}</div>
                <ReactAudioPlayer
                    style={{width:'100%', height:'40px'}}
                    preload="auto"
                    controls
                    autoPlay
                    onEnded={this.onEndedHandler}
                    onPause={this.handlerPause}
                    onPlay={this.handlerPlay}
                    ref={(element) => { this.rap = element; }}
                    src={`/api/music/read?path=${onPlay.src}`}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        onPlay: state.playlistStore.onPlay,
        playingList: state.playlistStore.playingList,
        activePlaylist: state.playlistStore.activePlaylist,
        isPaused: state.playlistStore.pause,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        pause: () => dispatch(
            pauseState()
        ),
        play: () => dispatch(
            playState()
        ),
        nextTracks: ( item ) => dispatch(
            playPlaylist( item )
        ),
    }
};

const AudioContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Audio);

export default AudioContainer