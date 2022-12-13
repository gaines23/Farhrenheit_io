import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../../hooks/use-http";
import { getCreditsTmdbId } from "../../../lib/tmdb-api";
import LoadingSpinner from "../LoadingSpinner";

const CreditsPosterCard = ({item}) => {
    const imdbId = item.id.substring(7, item.id.length-1);
    const { sendRequest, status, data: loadedResults, error } = useHttp(getCreditsTmdbId, true);

    useEffect(() => {
        sendRequest(imdbId);
    }, [sendRequest, imdbId]);

    if (status === "pending") {
        <LoadingSpinner />
    }

    const split_status = item.status.split(" ");
    const status_type = split_status.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");

    if (status === "completed") {
        const tmdbId = loadedResults[0].id;
        const media = loadedResults[0].media_type;
        return (
            <Fragment>  
                <Link 
                    to={{
                        pathname: `/details/${tmdbId}/${media}`,
                        state:{
                            id: {tmdbId},
                            media_type: {media},
                        }
                    }}
                >
                    <div className="group h-24 w-full my-3 flex">
                        <div className="w-1/5 h-24 float-left relative left-1 rounded-md shadow-xl shadow-black/20">
                            { item.image ? ( 
                                <img
                                    src={item.image.url}
                                    alt={item.image.id}
                                    className="w-full h-full rounded-md object-cover"
                                />
                                ) : 
                                <div className="flex h-full w-full rounded-md border-y border-l border-bg-fill/10">
                                    <p className="w-5/6 h-5 m-auto text-xs text-center">No Image</p>
                                </div>
                            }
                        </div>
                        
                        <div className="h-20 w-4/5 px-5 py-1 rounded-md text-input-fill/60 float-right m-auto grid grid-flow-row auto-rows-auto text-center group-hover:shadow-xl group-hover:shadow-black/20 overflow-hidden bg-bg-fill/10 group-hover:bg-bg-fill/20 group-hover:backdrop-blur-lg group-hover:bg-opacity-10">
                            <div className="w-full truncate">
                                <p className="w-full text-sm font-bold truncate text-left">
                                    {item.title}
                                </p>
                            </div>
                            <div className="h-auto">
                                <p className="text-xs w-full truncate text-left">
                                    {item.characters}
                                </p>
                            </div>
                            <div className="text-xs h-auto">
                                <div className="w-1/2 float-left text-sx text-left">
                                    {item.year ? item.year : status_type}
                                </div>
                                <div className="w-1/2 float-right text-right">
                                    {item.titleType === 'tvSeries' && (
                                        <p className="w-full">
                                            {item.episodeCount !== undefined ? item.episodeCount : '--'} Eps | Tv
                                        </p>
                                    )}
                                    {item.titleType === 'tvMiniSeries' && (
                                        <p className="w-full">
                                            Mini Series
                                        </p>
                                    )}
                                    {item.titleType === 'movie' && (
                                        <p className="w-full">
                                            Movie
                                        </p>
                                    )}
                                    {item.titleType === 'video' && (
                                        <p className="w-full">
                                            Video
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </Link> 
            </Fragment>
        ); 
    }
}

export default CreditsPosterCard;