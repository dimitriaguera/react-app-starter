/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import { ADD_PLAYLIST_ITEM } from '../actions'

let initialState = {
    list: [],
};

export const playlistStore = (state = initialState, action) => {
    switch (action.type) {

        case ADD_PLAYLIST_ITEM:
            return {
                ...state,
                list: state.list.concat(action.item)
            };

        default:
            return state
    }
};