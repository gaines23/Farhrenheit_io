import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import { HiOutlineHome } from 'react-icons/hi';
import { BiMessage } from 'react-icons/bi';
import { MdOutlineNotifications } from 'react-icons/md'

const NavbarOpen = () => {

    const listClassName = "h-10 w-full my-2 flex justify-center items-center";
    const linkClassName = "flex group px-1 h-8 w-full items-center rounded-lg outline-none hover:bg-bg-fill/10 hover:border-y hover:border-bg-fill/30";
    const iconClassName = "w-8 h-auto px-1 relative text-far-teal/30 group-hover:text-far-teal group-active:text-far-teal";
    const liDivClassName = "w-full h-10 flex";
    const pClassName = "text-far-teal/30 w-5/6 text-left mx-auto h-auto my-auto group-hover:text-far-teal";

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
                            <div className={liDivClassName}>
                                <p className={pClassName}>
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
                                <p className={pClassName}>
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
                                <p className={pClassName}>
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

export default NavbarOpen;