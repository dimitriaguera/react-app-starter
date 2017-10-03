import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'core/client/services/core.api.services'
import { activatePlaylist } from 'music/client/redux/actions'
import { Select } from 'semantic-ui-react'

class SelectPlaylist extends Component {

    constructor( props ) {
        super(  props );
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            allPlaylist: [],
        }
    }

    componentWillMount() {
        const _self = this;
        this.props.getAllPlaylistName()
            .then( (data) => {
                if( data.success ){
                    _self.setState({ allPlaylist: data.msg });
                }
            });
    }

    handleChange(e, data) {

        const value = data.value;
        const allPl = this.state.allPlaylist;

        let pl;

        for ( let i=0; i < allPl.length; i++ ) {
            if ( allPl[i].title === value ) {
                pl = allPl[i];
                break;
            }
        }
        this.props.activatePlaylist(pl);
    }

    render(){

        const { allPlaylist } = this.state;
        const playlistOptions = allPlaylist.map( (pl) => {
            return {
                key: pl.title,
                value: pl.title,
                text: pl.title,
            }
        });

        return (
            <Select placeholder='Select your playlist' onChange={this.handleChange} options={playlistOptions} />
        );
    }
}

const mapStateToProps = state => {
    return {
        activeList: state.playlistStore.activeList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        activatePlaylist: ( item ) => dispatch(
            activatePlaylist( item )
        ),
        getAllPlaylistName: () => dispatch(
            get( 'allPlaylist' )
        ),
    }
};

const SelectPlaylistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPlaylist);

export default SelectPlaylistContainer