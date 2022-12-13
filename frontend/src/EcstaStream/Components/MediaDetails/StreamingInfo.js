import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../../hooks/use-http";
import { getStreamingDetails } from "../../lib/tmdb-api";

import LoadingSpinner from "../UI/LoadingSpinner";
import StreamingList from "../UI/StreamingListDetailsPage";


const StreamingInfo = ({item}) => {
    const params = useParams();
    const { media_type, id } = params;
    const { sendRequest, status, data: streamingDetails, error } = useHttp(getStreamingDetails, true);

    useEffect(() => {
        sendRequest(params);
    }, [sendRequest, params]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return (<p className="text-center">There has been an issue with loading</p>);
    }

    if (status === 'completed' ) {
        //console.log(streamingDetails)
        return (
            
            <Fragment>
                <div className="w-full h-full">
                    <p className="text-sm py-1 text-center">Free</p>
                    {streamingDetails === undefined || streamingDetails.free === undefined ? (
                        <div className="w-full flex">
                            <button type='button' 
                                className="w-5/6 m-auto text-sm h-10 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10">
                                + Watchlist
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4">  
                        {streamingDetails.free.map(service => {
                                return (                                           
                                    <StreamingList key={service.provider_id} service={service} />
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="w-full h-full">
                    <p className="text-sm py-1 text-center">Rent</p>
                    {streamingDetails === undefined || streamingDetails.rent === undefined ? (
                        <div className="w-full flex">
                            <button type='button' 
                                className="w-5/6 m-auto text-sm h-10 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10">
                                + Watchlist
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4">  
                            {streamingDetails.rent.map(service => {
                                return (                                           
                                    <StreamingList key={service.provider_id} service={service} />
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="w-full h-full">
                    <p className="text-sm py-1 text-center">Purchase</p>
                    {streamingDetails === undefined || streamingDetails.buy === undefined ? (
                        <div className="w-full flex">
                            <button type='button' 
                                className="w-5/6 m-auto text-sm h-10 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10">
                                + Watchlist
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4">  
                            {streamingDetails.buy.map(service => {
                                return (                                           
                                    <StreamingList key={service.provider_id} service={service} />
                                );
                            })}
                        </div>
                    )}
                </div>
            </Fragment>
        );
    };
}

export default StreamingInfo;