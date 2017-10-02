/**
 * Created by Dimitri Aguera on 02/10/2017.
 */
import { post } from 'core/client/services/core.api.services'


export const ADD_PLAYLIST_ITEM = 'ADD_PLAYLIST_ITEM';


export const addPlaylistItem = ( item ) => {
    return {
        type: ADD_PLAYLIST_ITEM,
        item: item
    }
};
