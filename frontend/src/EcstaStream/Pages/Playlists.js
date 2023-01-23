import { Fragment } from "react";
import PlaylistTotals from "../Components/Playlists/UI/PlaylistTotals";
import NewPlaylistButton from "../Components/UI/Button/NewPlaylistButton";
import UserCreatedList from "../Components/Playlists/UI/UserCreatedList";

const Playlists = () => {
    return (
        <Fragment>
            <div className="w-full h-full flex grid grid-rows-3 gap-2">
                <div className="w-5/6 h-auto flex mx-auto">
                    <PlaylistTotals />
                    <NewPlaylistButton />
                </div>
                
                <div className="w-full h-auto">
                    <p>My Playlists</p>
                    <UserCreatedList />
                </div>

                <div className="w-full h-auto">
                    FOLLOWING
                </div>

            </div>
        </Fragment>
    );
}

export default Playlists;