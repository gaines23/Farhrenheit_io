import { Fragment, useState } from "react";

import CreatePlaylistModal from "../../../Modal/CreatePlaylistModal";
import { BsPlusLg } from "react-icons/bs";


const NewPlaylistButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Fragment>
            <div className="w-1/3 h-40 flex m-auto">
                <button 
                    className="w-36 h-full flex flex-col bg-bg-fill/10 py-2 mx-auto border rounded-lg border-bg-fill/10 hover:bg-bg-fill/20 hover:text-input-fill/50 hover:shadow hover:shadow-md hover:shadow-input-fill/10"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="h-1/2 flex w-5/6 m-auto">
                        <BsPlusLg className="h-8 w-1/2 m-auto text-2xl" />
                    </div>
                    <div className="h-1/2 flex w-5/6 m-auto">
                        <p className="h-10 m-auto text-center">New Playlist</p>
                    </div>
                </button>
            </div>
            {isOpen && <CreatePlaylistModal setIsOpen={setIsOpen} />}
        </Fragment>
    );
}

export default NewPlaylistButton;