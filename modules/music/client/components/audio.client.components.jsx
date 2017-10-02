import React, { Component } from 'react'
import { get } from 'core/client/services/core.api.services'

class Audio extends Component {

    constructor( props ) {
        super(  props );
    }

    componentWillMount() {

    }

    render(){

        const { src, visibility=true, item={name:''} } = this.props;

        return (
            visibility &&
            <div>
                <span>{item.name}</span>
                <audio style={{width:'100%', height:'40px'}} preload="auto" controls autoPlay="autoPlay"
                       src={`/api/music/read?path=${src}`}>
                </audio>
            </div>
        );
    }
}

export default Audio