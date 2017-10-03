import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'core/client/services/core.api.services'
import { playItem } from 'music/client/redux/actions'
import ReactAudioPlayer from 'react-audio-player'

class Audio extends Component {

    constructor( props ) {
        super(  props );
    }

    componentWillMount() {

    }

    onEndedHandler() {
        const { onPlay, playingList, readFile } = this.props;

    }

    render(){

        const { onPlay } = this.props;

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
        activeList: state.playlistStore.activeList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        readFile: ( item ) => dispatch(
            playItem( item )
        ),
    }
};

const AudioContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Audio);

export default AudioContainer