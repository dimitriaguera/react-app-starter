/**
 * Created by Dimitri Aguera on 21/09/2017.
 */
import Playlist from 'music/client/components/playlist.client.components.jsx';

export const routes = [
    {
        private: false,
        route: {
            path: '/playlist',
            exact: true,
            component: Playlist,
        },
    },
];
