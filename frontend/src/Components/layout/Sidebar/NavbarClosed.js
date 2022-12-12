import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import { HiOutlineHome } from 'react-icons/hi';
import { BiMessage } from 'react-icons/bi';
import { MdOutlineNotifications } from 'react-icons/md'

const NavbarClosed = () => {

    const listClassName = "h-10 w-full my-2 flex justify-center items-center";
    const linkClassName = "flex group px-1 h-8 w-fit items-center rounded-lg hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30";
    const iconClassName = "w-7 h-auto px-1 relative text-far-teal/30 group-hover:text-far-teal group-active:text-far-teal";

    return (
        <Fragment>
           <div className="w-full h-auto mx-auto my-2 flex flex-col">
                <p className="w-full h-auto text-center text-xs text-input-fill/30 px-2">Main</p>
                
                <ul className="w-full h-auto text-xs font-thin">
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