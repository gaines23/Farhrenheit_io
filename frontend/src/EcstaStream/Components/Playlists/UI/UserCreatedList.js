import { Fragment, useEffect } from "react";
import useHttp from "../../../../hooks/use-http";
import { getUserProfile } from "../../../lib/ec-api";

import PlaylistCard from "../UI/PlaylistCard";

const UserCreatedList = () => {
    const { sendRequest, status, data: userProfile } = useHttp(getUserProfile, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    // if (status === 'pending') {
    //     <LoadingSpinner />
    // }

        return (
            <Fragment>
                {userProfile}
                {/* {userProfile.user_playlists.map(playlist => {
                    return (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    );
                })} */}
            </Fragment>
        );        
    }

export default UserCreatedList;