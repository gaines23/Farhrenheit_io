import { Fragment } from "react";
import useHttp from "../../../../hooks/use-http";
import { getMovieCardDetails } from "../../../lib/tmdb-api";

const MoviePosterCard = () => {
    const { sendRequest, status, data: loadedDetails } = useHttp(getMovieCardDetails, true);
    
    return (
        <Fragment>

        </Fragment>
    );
}

export default MoviePosterCard;