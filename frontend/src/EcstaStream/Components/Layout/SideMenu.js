import { NavLink, Link } from 'react-router-dom';

import { linkClassName, iconClassName, itemClassName, activeLinkName } from '../Layout/UI/MenuStyles';
import { HiOutlineHome, HiOutlineUsers, HiOutlineNewspaper } from 'react-icons/hi';
import { Fragment } from 'react';
import Logo100 from '../../assets/Logo100.png';
import PlaylistsLinks from './PlaylistsLinks';

const SideMenu = () => {
    const following = localStorage.getItem('following');
    
    return (
        <Fragment> 
            <ul className="w-fit mx-auto h-auto flex flex-col">
                <div className="flex items-center w-auto h-16 my-5">
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

                {following === 'true' ? (<PlaylistsLinks /> ) : '' }
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