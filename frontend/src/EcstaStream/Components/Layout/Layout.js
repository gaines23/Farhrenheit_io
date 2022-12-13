import { Fragment } from "react";

import SideMenu from './SideMenu';
import Header from './Header';

const Layout = (props) => {
    return (
        <Fragment>
            <div className="h-full w-full mx-auto flex bg-ec-black">
                <div className="w-fit h-full flex flex-col ease-in">
                    <div className="w-11/12 h-full mx-auto flex flex-col">
                        <SideMenu />
                    </div>
                </div>

                <div className="w-full h-full flex flex-col">
                    <div className="h-16 w-11/12 flex mx-auto relative">
                        <Header />
                    </div>
                    <main className="w-full h-full py-1 flex flex-col rounded-lg px-2 relative bg-ec-purple/40 overflow-y-scroll overflow-hidden space-y-3 scroll-smooth scrollbar scrollbar-height:6 scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                    <div className="w-full h-full py-2 absolute flex flex-col">
                        <div className="inline w-11/12 h-full mx-auto">
                            {props.children}
                        </div>
                    </div> 
                    </main>               
                </div>

            </div>
        </Fragment>
    );
};

export default Layout;