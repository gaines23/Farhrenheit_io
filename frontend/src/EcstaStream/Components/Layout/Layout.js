import { Fragment, useState } from "react";

import SideMenu from './SideMenu';
import Header from './Header';
import StreamingListModal from "../../Modal/StreamingListModal";

/*
    sm - 640
    md - 768
    lg - 1024
    xl - 1280
    2xl - 1536
*/

const Layout = (props) => {
    let newFollower = localStorage.getItem('newFollower');

    const [isOpen, setIsOpen] = useState(true);

    return (
        <Fragment>
            <div className="h-full w-full px-2 mx-auto flex bg-ec-black/80 rounded-xl">
                <div className="w-fit h-full flex flex-col ease-in">
                    <div className="w-11/12 h-full mx-auto flex flex-col">
                        <SideMenu following={newFollower} />
                    </div>
                </div>

                <div className="w-11/12 h-full mx-auto flex flex-col py-1">
                    <div className="h-16 w-11/12 flex mx-auto relative">
                        <Header />
                    </div>
                    <main className="w-full h-full flex flex-col rounded-xl px-2 relative overflow-y-scroll overflow-hidden space-y-3 scroll-smooth scrollbar scrollbar-height:6 scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                        <div className="w-full h-full absolute flex flex-col">
                            <div className="inline w-11/12 h-full mx-auto py-2">
                                {props.children}
                            </div>
                        </div>

                        { newFollower === 'true' && 
                            <div className="w-full px-2 mx-auto h-5/6 absolute flex flex-col" >
                                { isOpen &&
                                    <StreamingListModal setIsOpen={setIsOpen} newFollower={true} />
                                }
                            </div>
                        }
                    </main>
                </div>

            </div>
        </Fragment>
    );
};

export default Layout;