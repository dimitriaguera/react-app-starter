/**
 * Created by Dimitri Aguera on 02/10/2017.
 */
import { post } from 'core/client/services/core.api.services'


export const ADD_PLAYLIST_ITEM = 'ADD_PLAYLIST_ITEM';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const PLAY_ITEM = 'PLAY_ITEM';


export const playItem = ( item ) => {
   return {
       type: PLAY_ITEM,
       item: item
   }
};

export const addPlaylistItem = ( item ) => {
    return {
        type: ADD_PLAYLIST_ITEM,
        item: item
    }
};
