/**
 * Created by Dimitri Aguera on 02/10/2017.
 */
import { post } from 'core/client/services/core.api.services'

export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const ACTIVATE_PLAYLIST = 'ACTIVATE_PLAYLIST';
export const PLAY_ITEM = 'PLAY_ITEM';


export const activatePlaylist = ( item ) => {
    return {
        type: ACTIVATE_PLAYLIST,
        item: item
    }
};

export const playItem = ( item ) => {
   return {
       type: PLAY_ITEM,
       item: item
   }
};

