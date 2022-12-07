import { Fragment } from "react";
import SideMenu from "./SideMenu";

const Layout = (props) => {
    return (
        <Fragment>                
            <div className="h-full w-full m-auto grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12">
                <div className="w-11/12 h-full mx-auto col-span-2">
                    <SideMenu />
                </div>
                <div className="w-full h-full col-span-10 px-2">
                    <div className="h-full w-full m-auto overflow-y-scroll space-y-3 scroll-smooth scrollbar scrollbar-height:sm scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
            
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Layout;