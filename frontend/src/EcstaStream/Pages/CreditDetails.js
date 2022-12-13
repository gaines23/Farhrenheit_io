import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { getCreditDetails } from "../lib/tmdb-api";

import LoadingSpinner from "../Components/UI/LoadingSpinner";
import NotFound from "./NotFound";
import TopCredits from "../Components/ActorDetails/TopCredits";
import FullCredits from "../Components/ActorDetails/FullCreditsList";
import CreditAwards from "../Components/ActorDetails/CreditAwards";

const CreditDetails = () => {
    const params = useParams();
    const { tmdbId, imdbId } = params;

    const imdb_id = imdbId;

    const { sendRequest, status, data: loadedDetails, error } = useHttp(getCreditDetails, true);

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
        return (
            <Fragment>
                <header className="w-full h-auto m-auto py-2 px-5 text-input-fill">
                    <p className="w-full h-full text-4xl font-extrabold text-left">{loadedDetails.name}</p>
                    <p className="text-sm text-light">{loadedDetails.known_for} | {loadedDetails.total_credits} credits</p>
                </header>

                <div className="w-full h-fit mt-5 px-5 grid grid-cols-4 gap-2">
                    <div className="flex h-full w-full col-span-1 px-2">
                        <img 
                            src={loadedDetails.img.url}
                            alt={loadedDetails.id}
                            className="w-full h-auto m-auto rounded-lg"
                        />
                    </div>
                    <div className="h-full w-full col-span-3 text-input-fill/60  bg-ec-purple/50 rounded-lg">
                        <div className="h-full w-full grid auto-rows-auto rounded-lg">
                            <div className="w-full h-1/2 m-auto px-1 text-sm text-light text-center grid grid-flow-col auto-cols-auto">
                                <p className="w-full">
                                    Height: {loadedDetails.feet}' 
                                    {(loadedDetails.inches > 0) ? loadedDetails.inches : 0}</p>
                                <p className="w-full">DOB: {loadedDetails.birthday}</p>
                                <p className="w-full">Home: {loadedDetails.birthplace}</p>
                            </div>
                            <div className="h-full w-5/6 m-auto">
                                <p className="w-full">Bio</p>
                                <p className="w-full h-36 px-3 py-1 flex-wrap overflow-x-auto scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">{loadedDetails.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <TopCredits credits={loadedDetails.top_credits} media={loadedDetails.media_type} />

                <div className="w-full h-auto mt-10 px-5 grid grid-cols-5 gap-2">
                    <div className="w-full h-auto m-auto px-5 col-span-2 bg-ec-purple/50 rounded-lg">
                        <p className="w-full text-lg h-10 font-bold pt-3 px-5">Credits</p>
                        <FullCredits imdb={imdb_id} />
                    </div>
                   
                    <div className="h-full w-full col-span-3">
                        <div className="w-full h-auto m-auto px-3 rounded-lg bg-ec-purple/50">
                            <h1 className="w-full text-lg px-5 h-10 font-bold pt-3">Awards</h1>
                            <div className="h-full w-full py-5 text-input-fill/60">
                                <CreditAwards />
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }

};

export default CreditDetails;