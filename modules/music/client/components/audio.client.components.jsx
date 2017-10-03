import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'core/client/services/core.api.services'

class Audio extends Component {

    constructor( props ) {
        super(  props );
    }

    componentWillMount() {

    }

    render(){

        const { onPlay } = this.props;

        return (
            !!onPlay.src &&
            <div style={{width:'100%', position: 'fixed', bottom: '0', lineHeight: '0'}}>
                <div style={{lineHeight: '1.5'}}>{onPlay.name}</div>
                <audio style={{width:'100%', height:'40px'}} preload="auto" controls autoPlay="autoPlay"
                       src={`/api/music/read?path=${onPlay.src}`}>
                </audio>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        onPlay: state.playlistStore.onPlay,
    }
};

const AudioContainer = connect(
    mapStateToProps,
    null
)(Audio);

export default AudioContainer