import { Fragment, useState } from "react";

import StreamingListModal from "../../../Modal/StreamingListModal";

const StreamingListButton = () => {    
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Fragment>
            <div className="w-full h-6 mx-auto flex my-1">
                <button 
                    className="w-24 h-6 mx-auto flex text-input-fill rounded-sm text-center font-light text-sm border-b border-input-fill"
                    onClick={() => setIsOpen(true)}
                >
                    + Add More
                </button>
                
                {isOpen && <StreamingListModal setIsOpen={setIsOpen} />}
            </div>
        </Fragment>
    );
};

export default StreamingListButton;