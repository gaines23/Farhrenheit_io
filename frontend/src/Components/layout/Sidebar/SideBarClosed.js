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
            <div className="h-24 w-full mx-auto py-2 flex justify-center items-center">
                <div className="w-auto h-auto my-auto ">
                    <Link to="/farhrenheit" className="h-full w-full outline-none">
                        <img
                            src={FarheneitLogo2}
                            alt="fahrenheit-io-logo"
                            className="w-full h-auto mx-auto"
                        />
                    </Link>
                </div>
            </div>
            <div className="h-24 w-full py-2 flex justify-center items-center">
                <div className="h-10 w-full my-2 flex justify-center items-center">
                    <div className="flex group px-1 h-8 w-fit items-center rounded-lg hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30">
                        <Link to="/farhrenheit/login" className="h-full w-full">
                            <FaRegUserCircle className="w-7 h-8 px-1 mt-auto relative text-far-teal/30 group-hover:text-far-teal group-active:text-far-teal" />
                        </Link>
                    </div>
                </div>
            </div>

            <form className="h-10 w-full my-2 flex justify-center items-center">
                <button
                    className="flex group px-1 h-8 w-fit items-center rounded-lg hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30"
                    type="submit"
                    >
                    <HiOutlineSearch className="w-7 h-auto px-1 relative text-far-teal/30 group-hover:text-far-teal group-active:text-far-teal"/>
                </button>
            </form>
                    
            <NavbarClosed />
            <AppListClosed />

        </Fragment>
    );
};
    

export default SideBarClosed;