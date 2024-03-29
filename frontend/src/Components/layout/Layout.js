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
            <div className="h-full w-full static bg-gradient-to-bl from-far-teal/10 to-far-teal/20">
                <div className="h-full w-full mx-auto py-2 flex overflow-hidden">
                    <div className="w-fit h-full flex flex-col ease-in">
                        <div className="w-11/12 h-full mx-auto flex flex-col">
                            {isOpen ? <SideBarOpen /> : <SideBarClosed />}
                        </div>
                        <div className="flex group px-1 h-8 w-2/3 mx-auto rounded-lg hover:bg-bg-fill/10 outline-none hover:shadow hover:shadow-md hover:shadow-bg-fill/10">
                            <button 
                                className="w-full h-8"
                                onClick={handleToggle}
                                title={isOpen ? "Hide" : "Expand"}
                            >
                                <p className="w-fit h-fit m-auto text-center text-input-fill/70 text-md">
                                    {isOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
                                </p>
                            </button>
                        </div>        
                    </div>
                
                    <div className="w-full h-full sticky z-100 flex bg-bg-fill/10 rounded-xl bg-clip-padding backdrop-filter shadow shadow-lg shadow-far-navy/80 border-bg-fill/30">
                        <main className="h-full w-full grid grid-flow-col grid-cols-1 flex overflow-hidden rounded-l-xl">
                            {props.children} 
                        </main>
                    </div>
                </div>    
            </div>
        </Fragment>
    );
};

export default Layout;