import { Fragment, useState } from "react";
import PlaylistTotals from "../Components/Playlists/UI/PlaylistTotals";
import NewPlaylistButton from "../Components/UI/Button/NewPlaylistButton";

const Playlists = () => {
    return (
        <Fragment>
            <div className="w-full h-full flex grid grid-rows-3 gap-2">
                <div className="w-5/6 h-1/5 flex mx-auto">
                    <PlaylistTotals />
                    <NewPlaylistButton />
                </div>
                
                <div className="w-full h-2/5">
                    MINE
                </div>

                <div className="w-full h-2/5">
                    FOLLOWING
                </div>

            </div>
        </Fragment>
    );
}

export default Playlists;