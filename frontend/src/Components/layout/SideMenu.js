import { Fragment, useState } from 'react';

import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import SideBarClosed from './Sidebar/SideBarClosed';
import SideBarOpen from './Sidebar/SidebarOpen';

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if(isOpen) {
            setIsOpen(false);
            return;
        }
        setIsOpen(true);
    }

    return (
        <Fragment>
            <div className="w-min h-full mx-auto fixed flex flex-col">
                {isOpen ? <SideBarOpen /> : <SideBarClosed />}
            

                <div className="flex group px-1 h-1/10 w-5/6 mx-auto rounded-lg hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30">
                    <button 
                        className="w-full h-8"
                        onClick={handleToggle}
                    >
                        <p className="w-fit h-fit m-auto text-center text-input-fill/70 text-md">{isOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}</p>
                    </button>
                </div>
            </div>
               
        </Fragment>
    );
};
    

export default SideMenu;