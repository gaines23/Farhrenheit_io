import { Fragment } from "react";

import SideBar from './Sidebar';
import Header from './Header';
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <Fragment>
            <div className="h-full w-full m-auto overflow-y-scroll space-y-3 scroll-smooth scrollbar scrollbar-height:sm scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                <div className="h-20">
                    <Header />
                </div>
                
                <div className="h-full w-full m-auto grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
                    
                    <div className="h-full w-full col-span-1">
                        <SideBar />
                    </div>

                    <div className="w-full h-full container m-auto mr-10 col-start-2 col-span-2 md:col-span-5 lg:col-span-7">
                            <main className="w-full h-full py-5 px-5">
                                <div className="inline w-full h-full">
                                    {props.children}
                                </div>
                            </main>
                        <Footer />
                    </div> 

                </div>

            </div>
        </Fragment>
    );
};

export default Layout;