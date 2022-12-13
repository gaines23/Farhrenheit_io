import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';

import NavbarOpen from './NavbarOpen';
import AppListOpen from './AppListOpen';

import FahrenheitLogo1 from '../../../assets/Fahrenheit100.png';

const SideBarOpen = () => {
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
            <div className="group h-24 w-auto px-1 py-2 font-light flex flex-col">
                <div className="w-8 h-8 flex mx-auto text-center text-sm text-far-teal/30">
                    <NavLink to="/fahrenheit/login" className="h-full w-full">
                        <FaRegUserCircle className="w-8 h-8 group-hover:text-far-teal"/>
                    </NavLink>
                </div>

                <div className="w-auto h-auto flex mt-1 px-2 py-2 text-center text-sm text-far-teal/30">
                    <NavLink to="/fahrenheit/login" className="h-full w-full">
                        <div className="w-full h-full m-auto pl-2">
                            <p className="h-min w-full my-auto group-hover:text-far-teal">Login/Signup</p>
                        </div>
                    </NavLink>
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
    );
};
    

export default SideBarOpen;