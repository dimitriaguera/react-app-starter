/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import { ACTIVATE_PLAYLIST, ADD_PLAYLIST, PLAY_ITEM } from '../actions'

let initialState = {
    list: [],
    onPlay: {
        name: null,
        src: null,
    },
    playingList: {
        plID: null,
        onPlayIndex: 0,
    },
    activePlaylist: null,
};

export const playlistStore = (state = initialState, action) => {
    switch (action.type) {

        case PLAY_ITEM:
            return {
                ...state,
                onPlay: action.item
            };

        case ACTIVATE_PLAYLIST:
            return {
                ...state,
                activePlaylist: action.item
            };

        case ADD_PLAYLIST:
            return {

            };

        default:
            return state
    }
};