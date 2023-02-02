import { NavLink, Link } from 'react-router-dom';

import { HiOutlineHome, HiOutlineUsers, HiOutlineNewspaper } from 'react-icons/hi';
import { RiComputerLine } from 'react-icons/ri';
import { AiOutlineHeart, AiOutlineUnorderedList } from 'react-icons/ai';
import { Fragment } from 'react';
import Logo100 from '../../assets/Logo100.png';

const SideMenu = () => {
    const linkClassName = "flex group p-2 h-14 items-center border-solid text-ec-purple/70";
    const iconClassName = "w-1/3 h-6";
    const itemClassName = "font-light text-sm text-ec-purple/70 group-hover:text-ec-purple-text w-2/3 border-solid group-hover:border-b-2 group-hover:border-input-fill/30";
    const activeLinkName = "text-ec-purple-text";
    
    return (
        <Fragment> 
            <ul className="w-fit mx-auto h-auto flex flex-col">
                <div className="flex items-center w-auto h-16 mb-2">
                    <Link to={"/fahrenheit/ecstastream/home"}>
                        <img src={Logo100} className="w-3/5 h-15 ml-6 items-center" alt="mainLogo" />  
                    </Link>
                </div>

                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream/home'} className={linkClassName} activeClassName={activeLinkName}>
                        <HiOutlineHome className={iconClassName} />
                        <p className={itemClassName}>
                            Home
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream/watchlist'} className={linkClassName} activeClassName={activeLinkName}>
                        <RiComputerLine className={iconClassName} />
                        <p className={itemClassName}>
                            Watchlist
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream/favorites'} className={linkClassName} activeClassName={activeLinkName}>
                        <AiOutlineHeart className={iconClassName} />
                        <p className={itemClassName}>
                            Favorites
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream/playlists'} className={linkClassName} activeClassName={activeLinkName}>
                        <AiOutlineUnorderedList className={iconClassName} />
                        <p className={itemClassName}>
                            Playlists
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream/friends'} className={linkClassName} activeClassName={activeLinkName}>
                        <HiOutlineUsers className={iconClassName} />
                        <p className={itemClassName}>
                            Friends
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream/news'} className={linkClassName} activeClassName={activeLinkName}>
                        <HiOutlineNewspaper className={iconClassName} />
                        <p className={itemClassName}>
                            News
                        </p>
                    </NavLink>
                </li>
            </ul>
        </Fragment>
    );
};

export default SideMenu;