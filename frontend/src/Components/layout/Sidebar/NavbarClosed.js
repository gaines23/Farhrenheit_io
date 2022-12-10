import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import { HiOutlineHome } from 'react-icons/hi';
import { BiMessage } from 'react-icons/bi';
import { MdOutlineNotifications } from 'react-icons/md'

const NavbarClosed = () => {

    const listClassName = "h-10 w-full my-2 px-1 flex";
    const linkClassName = "flex group px-1 h-10 w-full items-center rounded-lg outline-none hover:bg-bg-fill/10 hover:border-y hover:border-bg-fill/30";
    const iconClassName = "w-7 h-auto px-1 relative text-far-teal/60 group-hover:text-far-teal/80 group-active:text-far-teal";
    const liDivClassName = "w-full h-10 flex";
    const pClassName = "text-far-teal/40 w-5/6 text-left mx-auto h-auto my-auto group-hover:text-far-teal/80";

    return (
        <Fragment>
           <div className="w-full h-auto mx-auto my-2 flex flex-col">
                <p className="w-full h-auto text-xs text-input-fill/30 px-2">Main</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin">
                    <li className={listClassName}>
                        <NavLink 
                            to={'/fahrenheit'} 
                            className={linkClassName}
                        >
                            <HiOutlineHome className={iconClassName} />
                        </NavLink>
                    </li>
        
                    <li className={listClassName}>
                        <NavLink 
                            to={'/farhrenheit/notifications'} 
                            className={linkClassName}
                        >
                            <MdOutlineNotifications className={iconClassName} />
                        </NavLink>
                    </li>
                    <li className={listClassName}>
                        <NavLink 
                            to={'/farhrenheit/direct-messages'} 
                            className={linkClassName}
                        >
                            <BiMessage className={iconClassName} />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default NavbarClosed;