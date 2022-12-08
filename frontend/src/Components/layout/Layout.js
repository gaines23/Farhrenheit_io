import { Fragment } from "react";
import SideMenu from "./SideMenu";

/*
    sm - 640
    md - 768
    lg - 1024
    xl - 1280
    2xl - 1536

*/

const Layout = (props) => {
    return (
        <Fragment>
            <div className="fixed h-full w-full bg-bg-fill/10">
                <div className="h-full w-full bg-far-navy/20 p-1 m-auto grid md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-10">
                    <div className="w-full h-full mx-auto md:grid-cols-2 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
                        <SideMenu />
                    </div>
                    <div className="w-full h-full sticky p-2 md:grid-cols-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                        <main className="h-full w-full rounded-xl p-1 bg-far-navy">
                            {props.children} 
                        </main>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Layout;