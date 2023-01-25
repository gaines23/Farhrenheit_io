import { Fragment } from "react";

const PlaylistCard = ({playlist}) => {
    console.log(playlist)
    return (
        <Fragment>
            <div
                className="w-28 h-36 mt-3 relative inline-block rounded-md border border-input-fill/30"
                //onClick={handleClick}
            >
                <button 
                    className="h-full w-full p-1 mx-auto"
                    //Click={submitNewPlaylist}
                >
                    <div className="h-full w-24 p-1 mx-auto relative">
                        <h1 className="h-auto w-full absolute mx-auto text-input-fill text-lg text-left inset-x-0 bottom-0">
                           {playlist.title}
                        </h1>
                    </div>
                </button>
            </div>
        </Fragment>
    );
}

export default PlaylistCard;