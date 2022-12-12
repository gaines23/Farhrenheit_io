import { NavLink, Link, useLocation } from 'react-router-dom';

import { HiOutlineHome, HiOutlineUsers, HiOutlineNewspaper } from 'react-icons/hi';
import { RiComputerLine } from 'react-icons/ri';
import { AiOutlineHeart, AiOutlineUnorderedList } from 'react-icons/ai';
import { Fragment } from 'react';
import LogoPicFull from '../../assets/Logo-Final.png';
import Logo100 from '../../assets/Logo100.png';

const SideMenu = () => {
    const location = useLocation();
    const home = location.pathname;

    const linkClassName = "flex group p-2 h-14 items-center border-solid";
    const iconClassName = "w-1/3 h-6 text-ec-purple/70 group-hover:text-ec-purple-text group-active:text-input-fill/70";
    const itemClassName = "font-light text-sm text-ec-purple/70 group-hover:text-ec-purple-text w-2/3 border-solid group-hover:border-b-2 group-hover:border-input-fill/30";

    return (
        <Fragment> 
            <ul className="w-fit mx-auto h-auto flex flex-col">
                <div className="flex items-center w-auto h-16 mb-2">
                    <Link to={"/fahrenheit/ecstastream"}>
                        <img src={Logo100} className="w-3/5 h-15 ml-6 items-center" alt="mainLogo" />  
                    </Link>
                </div>

                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream'} className={linkClassName} >
                        <HiOutlineHome className={iconClassName} />
                        <p className={itemClassName}>
                            Home
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream'} className={linkClassName}>
                        <RiComputerLine className={iconClassName} />
                        <p className={itemClassName}>
                            Watchlist
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream'} className={linkClassName}>
                        <AiOutlineHeart className={iconClassName} />
                        <p className={itemClassName}>
                            Favorites
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream'} className={linkClassName}>
                        <AiOutlineUnorderedList className={iconClassName} />
                        <p className={itemClassName}>
                            Playlists
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream'} className={linkClassName}>
                        <HiOutlineUsers className={iconClassName} />
                        <p className={itemClassName}>
                            Friends
                        </p>
                    </NavLink>
                </li>
                <li className="h-14 mb-2">
                    <NavLink to={'/fahrenheit/ecstastream/news'} className={linkClassName}>
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