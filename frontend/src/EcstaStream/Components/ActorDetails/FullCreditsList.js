import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { getActorCredits } from "../../lib/tmdb-api";

import CreditsPosterCard from "../UI/Card/CreditsPosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import NotFound from "../../Pages/NotFound";

const FullCredits = () => {
    const params = useParams();
    const imdbId = params;

    const { sendRequest, status, data: loadedActorCredits, error } = useHttp(getActorCredits, true);

    useEffect(() => {
        sendRequest(params);
    }, [sendRequest, params]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return <NotFound />
    }

    if (status === 'completed') {
        //let acting = loadedActorCredits.category.filter((loadedActorCredits.category === 'actress') || (loadedActorCredits.category === 'actor'));
        
        return (
            <Fragment>
                {loadedActorCredits.acting.map(item => {
                    return (
                        <CreditsPosterCard key={item.id} item={item} />
                    );
                }).slice(0,15)}
               
            </Fragment>
        );
    }
};

export default FullCredits;