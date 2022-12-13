import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';

import {
    ClosedListClassName,
    ClosedIconClassName,
    ClosedLinkClassName,
} from  '../../UI/NavStyles';

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
                            title="Home"
                        />
                    </Link>
                </div>
            </div>
            <div className="h-24 w-full py-2 flex justify-center items-center">
                <div className={ClosedListClassName}>
                    <div className={ClosedLinkClassName}>
                        <Link to="/fahrenheit/login" className="h-fit w-full">
                            <FaRegUserCircle 
                                className={ClosedIconClassName}
                                title="Login"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <form className={ClosedListClassName}>
                <button
                    className={ClosedLinkClassName}
                    type="submit"
                    >
                    <HiOutlineSearch 
                        className={ClosedIconClassName}
                        title="Search"
                    />
                </button>
            </form>
                    
            <NavbarClosed />
            <AppListClosed />

        </Fragment>
    );
};
    

export default SideBarClosed;