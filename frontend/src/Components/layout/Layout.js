import { Fragment, useState } from 'react';

import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import SideBarClosed from './Sidebar/SideBarClosed';
import SideBarOpen from './Sidebar/SidebarOpen';


/*
    sm - 640
    md - 768
    lg - 1024
    xl - 1280
    2xl - 1536

*/

const Layout = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Fragment>
            <div className="h-full w-full bg-bg-fill/40">
                <div className="h-full w-full p-2 mx-auto bg-far-navy/60 flex">
                    <div className="w-fit h-full mx-auto flex flex-col">
                        <div className="w-11/12 h-full mx-auto flex flex-col">
                            {isOpen ? <SideBarOpen /> : <SideBarClosed />}
                            
                            <div className="flex group px-1 h-8 w-5/6 mx-auto rounded-lg hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30">
                                <button 
                                    className="w-full h-8"
                                    onClick={handleToggle}
                                >
                                    <p className="w-fit h-fit m-auto text-center text-input-fill/70 text-md">
                                        {isOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                
                    <div className="w-11/12 h-full sticky flex flex-col rounded-lg shadow p-1 shadow-2xl shadow-far-teal/10 bg-far-navy">
                        <main className="h-full w-full grid columns-12">
                            {props.children} 
                        </main>
                    </div>
                </div>    
            </div>
        </Fragment>
    );
};

export default Layout;