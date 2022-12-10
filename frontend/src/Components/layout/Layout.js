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
            <div className="h-full w-full bg-bg-fill/30">
                <div className="h-full w-full p-1 m-auto bg-far-navy/60 grid sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 2xl:grid-cols-10">
                    <div className="w-11/12 h-full mx-auto sm:grid-col-1 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
                        <SideMenu />
                    </div>
                    <div className="w-full h-full sticky p-1 sm:col-spans-4 md:col-span-5 lg:col-span-7 xl:col-span-8 2xl:col-span-9">
                        <main className="h-full w-full rounded-lg shadow p-1 shadow-2xl shadow-far-teal/10 bg-far-navy">
                            {props.children} 
                        </main>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Layout;