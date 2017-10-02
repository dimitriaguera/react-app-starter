import React from 'react'
import { List } from 'semantic-ui-react'

const PlaylistItem = (  props ) => {

    const { item, onPlay } = props;

    return (
        <List.Item>
            <List.Content onClick={onPlay}>
                <List.Header as='a'>{item.name}</List.Header>
            </List.Content>
        </List.Item>
    );
};

export default PlaylistItem