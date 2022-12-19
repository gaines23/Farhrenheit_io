import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import {
    ClosedListClassName,
    ClosedIconClassName,
    ClosedLinkClassName,
    ActiveLinkClassName,
} from  '../../UI/NavStyles';

import { HiOutlineHome } from 'react-icons/hi';
import { BiMessage } from 'react-icons/bi';
import { MdOutlineNotifications } from 'react-icons/md';
import { HiOutlineSearch } from 'react-icons/hi';

const NavbarClosed = () => {

    return (
        <Fragment>
            <form className={ClosedListClassName}>
                <button
                    className={ClosedLinkClassName}
                    type="submit"
                    >
                    <HiOutlineSearch 
                        className={ClosedIconClassName}
                        title="Search"
                    />
                </button>
            </form>

           <div className="w-full h-auto mx-auto my-2 flex flex-col">
                <p className="w-full h-auto text-center text-xs text-input-fill/30 px-2">Main</p>
                
                <ul className="w-full h-auto text-xs font-thin">
                    <li className={ClosedListClassName}>
                        <NavLink 
                            to={'/fahrenheit/home'} 
                            className={ClosedLinkClassName}
                            title="Home"
                            activeClassName={ActiveLinkClassName}
                        >
                            <HiOutlineHome className={ClosedIconClassName} />
                        </NavLink>
                    </li>
        
                    <li className={ClosedListClassName}>
                        <NavLink 
                            to={'/farhrenheit/notifications'} 
                            className={ClosedLinkClassName}
                            title="Notifications"
                            activeClassName={ActiveLinkClassName}
                        >
                            <MdOutlineNotifications className={ClosedIconClassName} />
                        </NavLink>
                    </li>
                    <li className={ClosedListClassName}>
                        <NavLink 
                            to={'/farhrenheit/direct-messages'} 
                            className={ClosedLinkClassName}
                            title="DMs"
                            activeClassName={ActiveLinkClassName}
                        >
                            <BiMessage className={ClosedIconClassName} />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default NavbarClosed;