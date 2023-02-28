import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import { linkClassName, iconClassName, itemClassName, activeLinkName } from '../Layout/UI/MenuStyles';
import { RiComputerLine } from 'react-icons/ri';
import { AiOutlineHeart, AiOutlineUnorderedList } from 'react-icons/ai';

const PlaylistsLinks = () => {
    return (
        <Fragment>
            <li className="h-14 mb-2">
                <NavLink to={'/fahrenheit/ecstastream/playlist/watchlist/details'} className={linkClassName} activeClassName={activeLinkName}>
                    <RiComputerLine className={iconClassName} />
                    <p className={itemClassName}>
                        Watchlist
                    </p>
                </NavLink>
            </li>
            <li className="h-14 mb-2">
                <NavLink to={'/fahrenheit/ecstastream/playlist/favorites/details'} className={linkClassName} activeClassName={activeLinkName}>
                    <AiOutlineHeart className={iconClassName} />
                    <p className={itemClassName}>
                        Favorites
                    </p>
                </NavLink>
            </li>
            <li className="h-14 mb-2">
                <NavLink to={'/fahrenheit/ecstastream/user-playlists'} className={linkClassName} activeClassName={activeLinkName}>
                    <AiOutlineUnorderedList className={iconClassName} />
                    <p className={itemClassName}>
                         Playlists
                    </p>
                </NavLink>
            </li>
        </Fragment>
    );
}

export default PlaylistsLinks;