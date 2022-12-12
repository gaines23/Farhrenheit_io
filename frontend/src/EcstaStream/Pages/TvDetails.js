import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";

import { getTvDetails } from "../lib/tmdb-api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NotFound from "./NotFound";
import StreamingInfo from "../components/MediaDetails/StreamingInfo";
import FriendsActivity from "../components/MediaDetails/FriendsActivity";
import CastCrew from "../components/MediaDetails/CastCrew";
import Awards from "../components/MediaDetails/Awards";
import Similar from '../components/MediaDetails/Similar';
import TvInfo from "../components/MediaDetails/TvInfo";
import PosterCard from "../components/UI/Card/PosterCard";
import Ratings from "../components/UI/Card/Ratings";

import { TMBD_POSTER_w780, TMBD_POSTER_w500 } from "../lib/constants";

const TvDetails = () => {
    const params = useParams();
    const { media_type, id } = params;

    const { sendRequest, status, data: tvDetails, error } = useHttp(getTvDetails, true);

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

                <div className="relative h-100">
                    <div
                        className="relative h-full w-full bg-cover rounded-lg"
                        style={{
                            backgroundImage: `url(${TMBD_POSTER_w780}${tvDetails.bg_pic})`,
                        }}
                    >      
                    </div>
                    <div className="h-72 w-4/5 absolute -inset-x-0 -bottom-16 m-auto rounded-md">
                        <div className="h-full w-1/4 m-auto p-1 flex float-left pr-1">
                            <img
                                src={TMBD_POSTER_w500 + tvDetails.poster}
                                className="rounded-md h-auto w-auto my-2 mx-auto"
                                alt={tvDetails.title}
                            />
                        </div>
                        <div className="h-full w-3/4 float-right text-input-fill bg-bg-fill/70 backdrop-blur-sm backdrop-contrast-150 rounded-md">
                            <div className="h-full m-auto grid grid-rows gap-3 grid-flex-row bg-gradient-to-br from-ec-purple-text/50 to-ec-orange/50 rounded-md">
                                <div className="w-full h-auto m-auto p-2">
                                    <h1 className="text-4xl font-extrabold text-center">{tvDetails.title}</h1>
                                </div>
                                
                                <div className="w-full h-full h-38 max-h-38 overflow-y-scroll m-auto grid grid-cols-3 gap-3 pb-3 px-5 bg-input-fill/40 rounded-sm">
                                    <StreamingInfo item={tvDetails} />
                                </div>
                        
                                <div className="w-full h-14 m-auto flex px-5 text-input-fill/60">
                                    <div className="w-1/2 h-5/6 m-auto float-left px-5">
                                        <p className="h-6 text-xs font-thin">{tvDetails.rated} | {tvDetails.runtime}</p>
                                        <p className="h-6 text-xs font-thin">{tvDetails.genres}</p>
                                    </div>
                                    <ul className="w-1/2 h-5/6 flex float-right m-auto px-2">
                                        <div className="w-4/5 m-auto">
                                            {tvDetails.ratings && tvDetails.ratings.map(rating => {
                                                return (
                                                    <Ratings key={rating.Source} rating={rating} />
                                                );
                                            })}   
                                        </div>
                                    </ul>
                                </div>
                            </div>  
                        </div>              
                    </div>
                </div>
 
                <div className="w-full h-40 mt-20 bg-ec-purple/50 rounded-lg">
                    <FriendsActivity id={tvDetails.imdb_id} />
                </div>

                <div className="w-full h-fit mt-5 px-2 grid grid-cols-5 gap-2">
                    
                    <div className="w-full h-auto m-auto px-1 col-span-2">
                        <CastCrew credits={tvDetails.credits}/>
                    </div>
                    
                    <div className="w-full h-auto gap-1 px-1 col-span-3">
                        <div className="h-full grid grid-rows-auto gap-3">

                            <div className="w-full h-auto bg-ec-purple/50 rounded-lg m-auto py-3">
                                <TvInfo 
                                    creators={tvDetails.creators} 
                                    first={tvDetails.air_date} 
                                    last={tvDetails.finale_date} 
                                    eps = {tvDetails.num_episodes}
                                    seasons = {tvDetails.num_seasons}
                                    next = {tvDetails.next_ep}
                                />
                            </div>
                            <div className="h-auto w-auto py-3 bg-ec-purple/50 rounded-lg">
                                <h1 className="h-10 pl-5 text-md">Summary</h1>
                                <p className="w-5/6 px-3 text-sm h-full m-auto text-input-fill/60 font-light text-left">
                                    {tvDetails.plot}
                                </p>
                            </div>
                            <div className="w-full h-auto m-auto rounded-lg justify-center items-center">
                                <iframe
                                    className="w-full rounded-md pointer-events-none m-auto"
                                    height="275"
                                    src={`https://www.youtube.com/embed/${tvDetails.trailer}`}
                                    frameBorder="0"
                                    allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                    allowFullScreen
                                    title={tvDetails.title}
                                ></iframe>
                            </div>
                            <div className="w-full h-auto m-auto bg-ec-purple/50 rounded-lg">
                                <h1 className="pl-5 pt-2 text-md">Awards</h1>
                                <div className="h-full pb-3 text-input-fill/60">
                                    <Awards id={tvDetails.imdb_id} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                
                {(tvDetails.seasons !== '' || tvDetails.seasons !== undefined) && (
                    <div className="mt-10">
                        <p className="w-5/6 text-lg">{tvDetails.seasons.length} Seasons</p>
                        <div className="h-full flex items-center px-5 py-1 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                            {tvDetails.seasons.map(item => {
                                return (
                                    <PosterCard key={item.id} item={item} media={tvDetails.media}/>
                                );
                            })}
                        </div>
                    </div>    
                )}
                        
                <Similar similar={tvDetails.similar} media={tvDetails.media} />
            </Fragment>
        );
        
    }

};

export default TvDetails;