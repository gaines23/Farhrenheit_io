import { Fragment, useContext, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from "../../../store/auth-context";
import useOutsideClick from "../../../hooks/useOutsideClick";


import NavbarOpen from './NavbarOpen';
import AppListOpen from './AppListOpen';
import FahrenheitLogo1 from '../../../assets/Fahrenheit100.png';

import {
    OpenNavListClass,
    OpenLinkClassName,
    OpenIconClassName,
    OpenPDivClassName,
    OpenParaClassName,
    ActiveLinkClassName,
} from '../../UI/NavStyles';

import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import { HiOutlineHome } from 'react-icons/hi';
import Options from '../../UI/Options';


const SideBarOpen = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const username = authCtx.username;

    const [optionsIsOpen, setOptionsIsOpen] = useState(false);

    const ref = useRef();
    
    const handleDropdown = () => {
        if(optionsIsOpen) {
            setOptionsIsOpen(false);
            return;
        }
        setOptionsIsOpen(true);
    }
    
    useOutsideClick(ref, () => {
        setOptionsIsOpen(false);
    });

        return (
            <Fragment>
                <div className="h-1/8 w-full flex">
                    <div className="w-auto h-auto mx-auto flex">
                        <NavLink to="/fahrenheit/home" className="h-full w-full outline-none">
                            <img
                                src={FahrenheitLogo1}
                                alt="fahrenheit-io-logo"
                                className="w-auto h-auto my-auto"
                            />
                        </NavLink>
                    </div>
                </div>

                {!isLoggedIn && (
                    <Fragment>
                        <div className="w-11/12 h-3/4 mx-auto flex flex-col">
                            <form className="w-full h-24 justify-center items-center mx-auto mb-1 text-xs flex">
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

                            <div className="w-full h-3/4 mx-auto my-2 flex flex-col">                        
                                <ul className="w-full mx-auto h-auto text-xs font-thin">
                                    <li className={OpenNavListClass}>
                                        <NavLink 
                                            to={'/fahrenheit/home'} 
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
                                </ul>
                            </div>
                        </div>

                        <div className="h-24 w-auto px-1 py-2 font-light flex flex-col">
                            <div className="w-8 h-8 flex mx-auto text-center text-sm text-far-teal/30">
                                <FaRegUserCircle className="w-8 h-8"/>
                            </div>

                            <div className="w-auto h-8 flex my-auto px-2 text-center text-xs text-far-teal/30">
                                <div className="w-full h-full relative flex rounded-lg border border-far-teal/20 m-auto">
                                    <Link 
                                        to="/fahrenheit/user/login/"
                                        className="h-full w-full mx-auto hover:border-far-teal hover:text-far-teal/80 hover:bg-bg-fill/10"
                                    >
                                        <button className="h-full w-full">
                                            Login/Signup
                                        </button>
                                    </Link>
                                </div>
                                
                            </div>
                        </div>
                </Fragment>
                )}

                {isLoggedIn && (
                    <Fragment>
                        <div className="h-3/4 w-11/12 mx-auto flex flex-col">
                            <div className="h-2/5 w-full m-auto flex flex-col">
                                <NavbarOpen />
                            </div>
                            <div className="h-3/5 w-full flex flex-col">
                                <AppListOpen />
                            </div>
                        </div>
                        
                        <div className="h-1/6 w-full py-2 font-light flex flex-col">
                            <div className="h-3/4 w-full flex flex-col my-auto px-1">
                                <div className="w-8 h-6 flex mx-auto text-center text-sm text-thin text-far-teal/30">
                                    <FaRegUserCircle className="w-8 h-8"/>
                                </div>

                                <div className="w-auto h-8 inline-block relative my-auto px-2 text-center text-xs text-far-teal/30">
                                    <div className="w-full h-full flex bg-bg-fill/10 m-auto rounded-lg shadow shadow-md shadow-bg-fill/20">
                                        <Link to="/fahrenheit/user-profile/" className="w-3/4 h-full">
                                            <button className="h-full w-full my-auto float-left rounded-l-lg hover:border-far-teal hover:text-far-teal/80 hover:bg-bg-fill/20">
                                                {username}
                                            </button>
                                        </Link>

                                        <div className="h-full w-1/4" onClick={handleDropdown}>
                                            <button 
                                                className="h-full w-full flex my-auto float-right rounded-r-lg hover:border-far-teal hover:text-far-teal/80 hover:bg-bg-fill/20" 
                                                ref={ref}
                                                >
                                                
                                                {!optionsIsOpen ? 
                                                    <BsCaretDown className="w-fit h-fit m-auto" /> 
                                                    : <BsCaretUp className="w-fit h-fit m-auto" /> 
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {optionsIsOpen && <Options setOptionsIsOpen={setOptionsIsOpen} />}
                                </div>
                                
                            </div>
                            
                        </div>
                    </Fragment>
                )}
            </Fragment>
        );
};
    

export default SideBarOpen;