import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';

import NavbarClosed from './NavbarClosed';
import AppListClosed from './AppListClosed';
import FarheneitLogo2 from '../../../assets/Fahrenheit.logo-clear.png';

const SideBarClosed = () => {
    return (
        <Fragment>
            <div className="h-auto w-auto px-2 py-2">
                <div className="w-full h-12 m-auto flex">
                    <Link to="/farhrenheit" className="h-full w-full outline-none">
                        <img
                            src={FarheneitLogo2}
                            alt="fahrenheit-io-logo"
                            className="w-full h-auto mx-auto"
                        />
                    </Link>
                </div>
            </div>
            <div className="group h-auto w-auto px-1 py-1">
                <div className="w-6 h-8 flex mx-auto text-center text-sm text-far-teal/60">
                    <Link to="/farhrenheit/login" className="h-full w-full">
                        <FaRegUserCircle className="w-6 h-8 group-hover:text-far-teal/80" />
                    </Link>
                </div>
            </div>

            <form className="h-auto w-auto justify-center items-center mx-auto my-3 text-xs">
                <button
                    className="w-8 h-full text-input-fill/50 items-center rounded-r-md hover:bg-far-yellow/80 hover:drop-shadow-md"
                    type="submit"
                    >
                    <HiOutlineSearch className="stroke-1 stroke-white m-auto w-2/3"/>
                </button>
            </form>
                    
            <NavbarClosed />
            <AppListClosed />

        </Fragment>
    );
};
    

export default SideBarClosed;