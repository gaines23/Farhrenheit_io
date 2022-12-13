import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import {
        OpenNavListClass,
        OpenLinkClassName,
        OpenIconClassName,
        OpenPDivClassName,
        OpenParaClassName,
        ActiveLinkClassName,
    } from '../../UI/NavStyles';

import { HiOutlineHome } from 'react-icons/hi';
import { BiMessage } from 'react-icons/bi';
import { MdOutlineNotifications } from 'react-icons/md';

const NavbarOpen = () => {
    return (
        <Fragment>
           <div className="w-full h-auto mx-auto my-2 flex flex-col">
                <p className="w-full h-auto text-xs text-input-fill/30 px-2">Main</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin">
                    <li className={OpenNavListClass}>
                        <NavLink 
                            to={'/fahrenheit'} 
                            className={OpenLinkClassName}
                            activeClassName={ActiveLinkClassName}
                        >
                            <HiOutlineHome className={OpenIconClassName} activestyle={{ActiveLinkClassName}}/>
                            <div className={OpenPDivClassName}>
                                <p className={OpenParaClassName}>
                                    Home
                                </p>
                            </div>
                        </NavLink>
                    </li>
        
                    <li className={OpenNavListClass}>
                        <NavLink 
                            to={'/farhrenheit/notifications'} 
                            className={OpenLinkClassName}
                            activeClassName={ActiveLinkClassName}
                        >
                            <MdOutlineNotifications className={OpenIconClassName} />                    
                            <div className={OpenPDivClassName}>
                                <p className={OpenParaClassName}>
                                    Notifications
                                    </p>
                            </div>
                        </NavLink>
                    </li>
                
                    <li className={OpenNavListClass}>
                        <NavLink 
                            to={'/farhrenheit/direct-messages'}
                            className={OpenLinkClassName}
                            activeClassName={ActiveLinkClassName}
                        >
                            <BiMessage className={OpenIconClassName} />                    
                            <div className={OpenPDivClassName}>
                                <p className={OpenParaClassName}>
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