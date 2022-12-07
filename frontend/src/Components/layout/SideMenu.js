import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';

import Navbar from './Sidebar/Navbar';
import FahrenheitLogo1 from '../../assets/Fahrenheit100.png';
import AppList from './Sidebar/AppList';

const SideMenu = () => {
    return (
        <Fragment>
            <div className="fixed">
                <div className="w-full h-full mx-auto">
                    <Link to="/farhrenheit" className="h-full w-full outline-none">
                        <img 
                            src={FahrenheitLogo1}
                            alt="fahrenheit-io-logo"
                            className="w-5/6 h-auto mx-auto"
                        />
                    </Link>
                </div>

                <div className="w-full h-full block ml-auto pb-2 border border-bg-fill/20  rounded-lg">
                    <div className="w-11/12 mb-3 py-1 mx-auto">
                        <div className="group h-full w-full px-2 py-2 font-light">
                            <div className="w-8 h-full mx-auto text-center text-sm text-far-teal/60">
                                <Link to="/farhrenheit/login" className="h-full w-full">
                                    <FaRegUserCircle className="w-8 h-auto group-hover:text-far-teal/80" />
                                </Link>
                            </div>
                            
                            <div className="w-full h-full mt-1 px-2 py-2 text-center text-sm text-far-teal/50">
                                <Link to="/farhrenheit/login" className="h-full w-full">
                                    <div className="w-full h-full m-auto inline-flex pl-2">
                                        <p className="h-min w-full my-auto group-hover:text-far-teal/80">Login/Signup</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <form className="flex w-full h-12 justify-center items-center mx-auto mt-3 text-sm">
                            <div className="relative w-full h-8 m-auto border-far-teal/20 hover:border-far-teal/50 border-2 rounded-lg">
                                <input className="w-5/6 float-left text-input-fill/50 font-thin h-full bg-transparent pl-5 focus:outline-none focus:bg-bg-fill/10" 
                                    type="search"
                                    placeholder="Search..."
                                />
                                <button
                                    className="w-1/6 float-right h-full text-input-fill/50 items-center rounded-r-md hover:bg-far-yellow/80 hover:drop-shadow-md"
                                    type="submit"
                                        
                                >
                                    <HiOutlineSearch className="stroke-1 stroke-white m-auto w-2/3" />
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <Navbar />
                    <AppList />
                
                </div>

                
            </div>
        </Fragment>
    );
};
    

export default SideMenu;