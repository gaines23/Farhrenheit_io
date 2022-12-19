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
import { HiOutlineSearch } from 'react-icons/hi';

const NavbarOpen = () => {
    return (
        <Fragment>
            <form className="w-full h-1/4 justify-center items-center mx-auto mb-1 text-xs flex">
                <div className="w-auto h-8 m-auto border-far-teal/20 border rounded-lg shadow shadow-md shadow-bg-fill/10">
                    <input className="w-5/6 float-left text-input-fill/50 font-thin h-full bg-transparent pl-5 focus:outline-none focus:bg-bg-fill/10" 
                        type="search"
                        placeholder="Search..."
                    />
                    <button
                        className="w-1/6 float-right h-full text-input-fill/30 items-center rounded-r-md hover:bg-far-teal/10 hover:drop-shadow-md"
                        type="submit"
                    >
                    <HiOutlineSearch className="stroke-1 stroke-white m-auto w-2/3"/>
                    </button>
                </div>
            </form>

           <div className="w-full h-3/4 mx-auto mt-2 flex flex-col">
                <p className="w-full h-auto text-xs text-input-fill/30 px-2">Main</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin">
                    <li className={OpenNavListClass}>
                        <NavLink 
                            to={'/fahrenheit/home'} 
                            className={OpenLinkClassName}
                            activeClassName={ActiveLinkClassName}
                        >
                            <HiOutlineHome className={OpenIconClassName} />
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