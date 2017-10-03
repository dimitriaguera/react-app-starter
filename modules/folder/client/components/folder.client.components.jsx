import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Divider, Button, Icon, Breadcrumb } from 'semantic-ui-react'
import { get, put } from 'core/client/services/core.api.services'
import { playItem, activatePlaylist } from 'music/client/redux/actions'
import SelectPlaylist from 'music/client/components/selectPlaylist.client.components'

class Folder extends Component {

    constructor() {
        super();
        this.handlerOpenFolder = this.handlerOpenFolder.bind(this);
        this.handlerPrevFolder = this.handlerPrevFolder.bind(this);
        this.state = {
            path: [],
            folder: [],
            error: false,
        };
    }

    componentWillMount() {

        const _self = this;
        const { fetchFolder } = this.props;

        fetchFolder().then((data) => {
            if ( !data.success ) {
                _self.setState({ error: true });
            }
            else {
                _self.setState({
                    error: false,
                    folder: data.msg
                });
            }
        });
    }

    handlerOpenFolder( path ) {

        return (e) => {

            const _self = this;
            const {fetchFolder} = this.props;

            fetchFolder( buildPath(path) ).then((data) => {
                if ( !data.success ) {
                    _self.setState({ error: true });
                }
                else {
                    _self.setState({
                        error: false,
                        path: path,
                        folder: data.msg
                    });
                }
            });

            e.preventDefault();
        }
    }

    handlerPrevFolder(e) {

        const _self = this;
        const { fetchFolder } = this.props;
        const path = this.state.path.slice(0, -1);

        fetchFolder( buildPath(path) ).then((data) => {
            if ( !data.success ) {
                _self.setState({ error: true });
            }
            else {
                _self.setState({
                    error: false,
                    path: path,
                    folder: data.msg
                });
            }
        });

        e.preventDefault();
    }

    handlerReadFile( item, path ) {

        const play = {
            name: item.name,
            src: path,
        };

        return (e) => {
            this.props.readFile( play );
            e.preventDefault();
        }
    }

    handlerAddItem( item, path ) {

        const play = {
            name: item.name,
            src: path,
        };

        return (e) => {
            const pl = this.props.activePlaylist;
            const tracks = pl.tracks.concat([play]);

            this.props.updatePlaylistItem( pl.title, tracks );
            e.preventDefault();
        }
    }

    render(){

        const { folder, path, error } = this.state;
        const bread = buildBread(path, this.handlerOpenFolder);

        const Bread = () => (
            <Breadcrumb divider='/' sections={bread} />
        );

        const folderList = folder.map( ( item, i )=> {

            let nextPath = path.slice(0);
            nextPath.push(item.name);
            const stringPath = buildPath(nextPath);

            const handlerClick = item.isFile ?
                this.handlerReadFile( item, stringPath ) :
                this.handlerOpenFolder( nextPath );

            return (
                <FolderItemList key={i}
                                item={item}
                                path={stringPath}
                                onClick={handlerClick}
                                addItem={this.handlerAddItem(item, stringPath)}
                />
            );
        });

        return (
            <div>
                <h1>Folder</h1>
                <Divider/>
                <SelectPlaylist />
                <Button circular size="small" color="grey" basic disabled={!path.length} onClick={this.handlerPrevFolder} icon>
                    <Icon name='arrow left' />
                </Button>
                <Bread/>

                <List divided relaxed>
                    {!error ? folderList : `Can't read root folder`}
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activePlaylist: state.playlistStore.activePlaylist,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFolder: ( query ) => dispatch(
            get( `folder?path=${query || ''}` )
        ),
        updatePlaylistItem: ( title, items ) => dispatch(

            put( `playlist/${title}`, {
                data: {tracks: items},
                types: {
                    HOOK_TYPE: ( data ) => {
                        return dispatch => {
                            dispatch(activatePlaylist(data.msg))
                        }
                    },
                }
            } )
        ),
        readFile: ( item ) => dispatch(
            playItem( item )
        ),
    }
};

const FolderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Folder);



const FolderItemList = ({ onClick, item, addItem }) => {

    return (
        <List.Item>
            {item.isFile && (
            <List.Content floated='right'>
                <Button onClick={addItem} icon basic size="mini" color="teal">
                    <Icon name='plus' />
                </Button>
            </List.Content>
            )}
            <List.Icon name={item.isFile?'file outline':'folder'} verticalAlign='middle' />
            <List.Content onClick={onClick}>
                <List.Header as='a'>{item.name}</List.Header>
            </List.Content>
        </List.Item>
    );
};



// HELPER
function buildPath( array ){
    let path = '';
    for( let i=0; i<array.length; i++ ) {
        path += `${array[i]}/`;
    }
    return path;
}

function buildBread( array, handler ){

    const l = array.length - 1;

    return array.map( (item, i) => {

        const link = { key: item, content: item };

        if ( i !== l ) link.onClick = handler(array.slice(0, i + 1));
        else link.active = true;

        return link;
    });
}




export default FolderContainer