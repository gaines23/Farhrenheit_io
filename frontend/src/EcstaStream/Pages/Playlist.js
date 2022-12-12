import Watchlist from './Watchlist';
import Favorites from './Favorites';
import { Fragment } from 'react';

const Playlist = () => {
    return (
        <Fragment>
            <Watchlist />
            <Favorites />
        </Fragment>
    );
    
};

export default Playlist;