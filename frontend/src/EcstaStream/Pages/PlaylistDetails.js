import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { getPlaylistDetails } from "../lib/ec-api";
import NotFound from "./NotFound";

const PlaylistDetails = () => {
    const params = useParams();
    const {id} = params;

    const { sendRequest, status, data: userPlaylists, error } = useHttp(getPlaylistDetails, true);

    useEffect(() => {
        sendRequest(params);
    }, [sendRequest, params]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return <NotFound/>
    }

    if (status === 'completed') {
        console.log(userPlaylists)
    }

    

    return (
        <Fragment>
            
        </Fragment>
    );
}

export default PlaylistDetails;