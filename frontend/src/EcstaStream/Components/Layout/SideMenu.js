import { NavLink } from 'react-router-dom';

import { HiOutlineHome, HiOutlineUsers, HiOutlineNewspaper } from 'react-icons/hi';
import { RiComputerLine } from 'react-icons/ri';
import { AiOutlineHeart, AiOutlineUnorderedList } from 'react-icons/ai';

const SideMenu = () => {
    const linkClassName = "flex group p-2 text-base h-14 items-center border-solid";
    const iconClassName = "w-1/3 h-6 text-base text-ec-purple group-hover:text-input-fill/70 group-active:text-input-fill/70";
    const itemClassName = "font-semibold text-base text-ec-purple-text w-2/3 border-solid group-hover:border-b-2 group-hover:border-input-fill/30";

    return (
        <ul className="w-48 mx-auto h-3/5 mt-3">
            <li className="h-14 mb-2">
                <NavLink to={'/ecstastream'} className={linkClassName} >
                    <HiOutlineHome className={iconClassName} />
                    <p className={itemClassName}>
                        Home
                    </p>
                </NavLink>
            </li>
            <li className="h-14 mb-2">
                <NavLink to={'/ecstastream'} className={linkClassName}>
                    <RiComputerLine className={iconClassName} />
                    <p className={itemClassName}>
                        Watchlist
                    </p>
                </NavLink>
            </li>
            <li className="h-14 mb-2">
                <NavLink to={'/ecstastream'} className={linkClassName}>
                    <AiOutlineHeart className={iconClassName} />
                    <p className={itemClassName}>
                        Favorites
                    </p>
                </NavLink>
            </li>
            <li className="h-14 mb-2">
                <NavLink to={'/ecstastream'} className={linkClassName}>
                    <AiOutlineUnorderedList className={iconClassName} />
                    <p className={itemClassName}>
                        Playlists
                    </p>
                </NavLink>
            </li>
            <li className="h-14 mb-2">
                <NavLink to={'/ecstastream'} className={linkClassName}>
                    <HiOutlineUsers className={iconClassName} />
                    <p className={itemClassName}>
                        Friends
                    </p>
                </NavLink>
            </li>
            <li className="h-14 mb-2">
                <NavLink to={'/ecstastream/news'} className={linkClassName}>
                    <HiOutlineNewspaper className={iconClassName} />
                    <p className={itemClassName}>
                        News
                    </p>
                </NavLink>
            </li>
        </ul>
    );
};

export default SideMenu;