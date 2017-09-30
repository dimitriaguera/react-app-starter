import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'core/client/services/core.api.services'
import { List, Divider, Button, Icon, Breadcrumb } from 'semantic-ui-react'

class Folder extends Component {

    constructor() {
        super();
        this.handlerOpenFolder = this.handlerOpenFolder.bind(this);
        this.handlerPrevFolder = this.handlerPrevFolder.bind(this);
        this.state = {
            path: [],
            folder: [],
        };
    }

    componentWillMount() {

        const _self = this;
        const { fetchFolder } = this.props;

        fetchFolder().then((data) => {
            if ( data.success ){
                _self.setState({folder: data.msg});
            }
        });
    }

    handlerOpenFolder( path ) {

        return (e) => {

            console.log(path);
            const _self = this;
            const {fetchFolder} = this.props;

            fetchFolder(buildPath(path)).then((data) => {
                if (data.success) {
                    _self.setState({
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
            if ( data.success ){
                _self.setState({
                    path: path,
                    folder: data.msg
                });
            }
        });

        e.preventDefault();
    }

    render(){

        const { folder, path } = this.state;
        const bread = buildBread(path, this.handlerOpenFolder);

        const Bread = () => (
            <Breadcrumb divider='/' sections={bread} />
        );

        const folderList = folder.map( ( item, index )=> {
            let nextPath = path.slice(0);
            nextPath.push(item.name);
            return (
                <List.Item key={index} onClick={this.handlerOpenFolder(nextPath)}>
                    <List.Icon name={item.isFile?'file outline':'folder'} verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{item.name}</List.Header>
                    </List.Content>
                </List.Item>
            );
        });

        return (
            <div>
                <h1>Folder</h1>
                <Divider/>
                <Button circular size="small" color="grey" basic disabled={!path.length} onClick={this.handlerPrevFolder} icon>
                    <Icon name='arrow left' />
                </Button>
                <Bread/>

                <List divided relaxed>
                    {folderList}
                </List>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFolder: ( query ) => dispatch(
            get( `folder?path=${query || ''}` )
        ),
    }
};

const FolderContainer = connect(
    null,
    mapDispatchToProps
)(Folder);





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