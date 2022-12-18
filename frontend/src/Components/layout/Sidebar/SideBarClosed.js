import { Fragment, useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import AuthContext from '../../../store/auth-context';

import OptionsClosed from '../../UI/OptionsClosed';
import NavbarClosed from './NavbarClosed';
import AppListClosed from './AppListClosed';

import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { HiOutlineHome } from 'react-icons/hi';

import {
    ClosedListClassName,
    ClosedIconClassName,
    ClosedLinkClassName,
} from  '../../UI/NavStyles';

import FarheneitLogo2 from '../../../assets/Fahrenheit.logo-clear.png';


const SideBarClosed = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        setIsOpen(true);
    }

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

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

            {!isLoggedIn && (
                <Fragment>
                    <div className="w-11/12 h-3/4 mx-auto flex flex-col">
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

                        <ul className="w-full h-auto text-xs font-thin">
                            <li className={ClosedListClassName}>
                                <NavLink 
                                    to={'/fahrenheit'} 
                                    className={ClosedLinkClassName}
                                    title="Home"
                                >
                                    <HiOutlineHome className={ClosedIconClassName} />
                                </NavLink>
                            </li>
                        </ul>                    
                    </div>

                    <div className="h-24 w-full py-2 flex justify-center items-center">
                        <div className={ClosedListClassName}>
                            <div className={ClosedLinkClassName}>
                                <Link to="/fahrenheit/user/login/" className="h-fit w-full">
                                    <FaRegUserCircle 
                                        className={ClosedIconClassName}
                                        title="Login"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                </Fragment>
            )}  


            {isLoggedIn && (
                <Fragment>
                    <div className="h-3/4 w-11/12 mx-auto flex flex-col">
                        <div className="h-1/3 w-full m-auto flex flex-col">
                            <NavbarClosed />
                        </div>
                        <div className="h-2/3 w-full flex flex-col">
                            <AppListClosed />
                        </div>
                    </div>

                    <div className="h-1/6 w-full py-2 font-light flex flex-col">
                        <div className="h-3/4 w-full relative flex flex-col my-auto px-1">
                            <div className={ClosedListClassName}>
                                <div className={ClosedLinkClassName}>
                                    <button className="h-full w-full" onClick={handleDropdown}>
                                        <FaRegUserCircle 
                                            className={ClosedIconClassName}                                        />
                                    </button >
                                </div>
                            </div>
                        {isOpen && <OptionsClosed />}
                        </div>
                        
                    </div>
                </Fragment>
            )}

        </Fragment>
    );
};
    

export default SideBarClosed;