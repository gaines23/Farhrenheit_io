import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import { HiOutlineHome } from 'react-icons/hi';
import { BiMessage } from 'react-icons/bi';
import { MdOutlineNotifications } from 'react-icons/md'

const Navbar = () => {

    const listClassName = "h-10 w-full my-2 px-2";
    const linkClassName = "flex group px-1 h-10 w-full items-center rounded-full outline-none hover:bg-bg-fill/10 hover:border-y hover:border-bg-fill/30";
    const iconClassName = "w-auto h-6 left-3 relative text-far-teal/60 group-hover:text-far-yellow/80 group-active:text-far-teal";
    const itemClassName = "text-far-teal/40 w-2/3 mx-auto h-auto my-auto group-hover:text-far-teal/80";
    const liDivClassName = "w-full h-10 flex";

    return (
        <Fragment>
           <div className="w-11/12 h-full mx-auto py-1">
                <p className="w-full h-8 text-xs text-input-fill/30 px-2">Main</p>
                
                <ul className="w-full mx-auto h-full text-sm font-thin">
                    <li className={listClassName}>
                        <NavLink 
                            to={'/farhrenheit'} 
                            className={linkClassName}
                        >
                            <HiOutlineHome className={iconClassName} />                    
                            <div className={liDivClassName}>
                                <p className={itemClassName}>
                                    Home
                                </p>
                             </div>
                        </NavLink>
                    </li>
        
                    <li className={listClassName}>
                        <NavLink 
                            to={'/farhrenheit/notifications'} 
                            className={linkClassName}
                        >
                            <MdOutlineNotifications className={iconClassName} />                    
                            <div className={liDivClassName}>
                                <p className={itemClassName}>
                                    Notifications
                                </p>
                             </div>
                        </NavLink>
                    </li>
                    <li className={listClassName}>
                        <NavLink 
                            to={'/farhrenheit/direct-messages'} 
                            className={linkClassName}
                        >
                            <BiMessage className={iconClassName} />                    
                            <div className={liDivClassName}>
                                <p className={itemClassName}>
                                    DMs
                                </p>
                             </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default Navbar;