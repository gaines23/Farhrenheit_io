import { Fragment, useEffect } from "react";
import LoadingSpinner from "../../../../Components/UI/LoadingSpinner";
import useHttp from "../../../../hooks/use-http";
import { getUserProfile } from "../../../lib/ec-api";

import PlaylistCard from "../UI/PlaylistCard";

const UserCreatedList = () => {
    const { sendRequest, status, data: userProfile } = useHttp(getUserProfile, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (status === 'completed') {
        return (
            <Fragment>
                <div className="mt-5 mb-5">
                    <p className="w-full text-lg">My Playlists ({userProfile.user_playlists.length})</p>
                    <div
                        className="h-full flex items-center px-5 py-1 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent"
                    >
                    {userProfile.user_playlists.map(playlist => {
                        return (
                            <PlaylistCard key={playlist.ec_playlist_id} playlist={playlist} />
                        );
                    })}
                    </div>
                </div>
            </Fragment>
        );           
    }
     
}

export default UserCreatedList;