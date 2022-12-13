import { Fragment, useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { getSeriesDetails } from "../../lib/tmdb-api";
import PosterCard from "../UI/Card/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";

const Series = ({series, media}) => {
    const { sendRequest, status, data: seriesDetails, error } = useHttp(getSeriesDetails, true);

    useEffect(() => {
        sendRequest(series);
    }, [sendRequest, series]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return 
    }

    if (status === 'completed') {
        return (
            <Fragment>
                {seriesDetails.parts.map(item => {
                    return (
                        <PosterCard key={item.id} item={item} media={media} />
                    );
                })}
            </Fragment>
        );
    }
};

export default Series;