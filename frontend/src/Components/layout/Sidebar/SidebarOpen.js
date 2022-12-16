import { Fragment, useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from "../../../store/auth-context";

import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

import NavbarOpen from './NavbarOpen';
import AppListOpen from './AppListOpen';

import FahrenheitLogo1 from '../../../assets/Fahrenheit100.png';

const SideBarOpen = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        if(isOpen) {
            setIsOpen(false);
            return;
        }
        setIsOpen(true);
    }

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;
    
    const logoutHandler = () => {
      authCtx.logout();
    };

    return (
        <Fragment>
            <div className="h-24 w-full flex">
                <div className="w-auto h-auto mx-auto flex">
                    <NavLink to="/fahrenheit" className="h-full w-full outline-none">
                        <img
                            src={FahrenheitLogo1}
                            alt="fahrenheit-io-logo"
                             className="w-auto h-auto my-auto"
                        />
                    </NavLink>
                </div>
            </div>

            {!isLoggedIn && (
                <div className="group h-24 w-auto px-1 py-2 font-light flex flex-col">
                    <div className="w-8 h-8 flex mx-auto text-center text-sm text-far-teal/30">
                        <NavLink to="/fahrenheit/user/login/" className="h-full w-full">
                            <FaRegUserCircle className="w-8 h-8 group-hover:text-far-teal"/>
                        </NavLink>
                    </div>

                    <div className="w-auto h-auto flex mt-1 px-2 py-2 text-center text-sm text-far-teal/30">
                        <NavLink to="/fahrenheit/user/login/" className="h-full w-full">
                            <div className="w-full h-full m-auto pl-2">
                                <p className="h-min w-full my-auto group-hover:text-far-teal">Login/Signup</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            )}

            {isLoggedIn && (
                <Fragment>
                    <div className="h-24 w-auto px-1 py-2 font-light flex flex-col">
                        <div className="w-8 h-8 flex mx-auto text-center text-sm text-far-teal/30">
                            <FaRegUserCircle className="w-8 h-8"/>
                        </div>

                        <div className="w-auto h-8 inline-block relative mt-2 px-2 text-center text-xs text-far-teal/30">
                            {/* <NavLink to="/fahrenheit/user/user-profile/" className="h-full w-full"> */}
                                <div className="w-full h-full relative flex rounded-lg border border-far-teal/20  m-auto" onClick={handleDropdown}>
                                    <button className="h-full w-3/4 my-auto float-left hover:border-far-teal hover:text-far-teal/80 hover:bg-bg-fill/10">
                                        <Link to="/fahrenheit/user/user-profile/">
                                            PROFILE
                                        </Link>
                                    </button> 
                                    
                                    <p className="h-full w-1/4 flex my-auto float-right hover:border-far-teal hover:text-far-teal/80 hover:bg-bg-fill/10">
                                        {!isOpen ? 
                                            <BsCaretDown className="w-fit h-fit m-auto" /> 
                                            : <BsCaretUp className="w-fit h-fit m-auto" /> 
                                        }
                                    </p>
                                </div>
                            {/* </NavLink> */}
                        </div>
                    </div>

                    <form className="w-full h-auto justify-center items-center mx-auto my-3 text-xs flex">
                        <div className="w-auto h-8 m-auto border-far-teal/20 hover:border-far-teal/50 border-2 rounded-lg">
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
                            
                    <NavbarOpen />
                    <AppListOpen />
                    
                </Fragment>
            )}
        </Fragment>
    );
};
    

export default SideBarOpen;