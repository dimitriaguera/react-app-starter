/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import { ADD_PLAYLIST_ITEM, ADD_PLAYLIST, PLAY_ITEM } from '../actions'

let initialState = {
    list: [],
    onPlay: {
        name: null,
        src: null,
    },
};

export const playlistStore = (state = initialState, action) => {
    switch (action.type) {

        case PLAY_ITEM:
            return {
                ...state,
                onPlay: action.item
            };

        case ADD_PLAYLIST:
            return {

            };

        case ADD_PLAYLIST_ITEM:
            return {
                ...state,
                list: state.list.concat(action.item)
            };

        default:
            return state
    }
};