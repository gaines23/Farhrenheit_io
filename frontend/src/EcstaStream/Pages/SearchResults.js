import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";

import useHttp from '../../hooks/use-http';
import { getMultiSearchResults } from '../lib/tmdb-api';
import NotFound from '../Pages/NotFound';
import LoadingSpinner from "../Components/UI/LoadingSpinner";

import SearchResultsCard from "../Components/UI/Card/SearchResultsCard";
import SearchResultPersonCard from "../Components/UI/Card/SearchResultPersonCard";

const SearchResults = () => {
    const location = useLocation();
    const search = location.search;

    const get_search = new URLSearchParams(search).get("query");
    const { sendRequest, status, data: searchResults, error } = useHttp(getMultiSearchResults, true);
    
    useEffect(() => {
        sendRequest(get_search);
    }, [sendRequest, get_search]);

    if (status === 'pending') {
        return (
            <div>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <p>{error}</p>
        );
    }

    if (status === 'completed' && (!searchResults || searchResults.length === 0)) {
        return (
            <NotFound />
        );
    }

    if (status === 'completed') {
        const searchGroup = (array, key) => {
            return array.reduce((result, curValue) => {
                (result[curValue[key]] = result[curValue[key]] || []).push(curValue);
                return result;
            }, {});
        };

        const search = searchGroup(searchResults, 'media_type');

        return (
            <Fragment>
                <div className="min-h-72 w-full px-5 py-5">
                    <h1 className="text-lg text-input-fill text-bold">Search Results: {`"${get_search}"`} </h1>
                    <div className="h-auto mt-5 grid grid-flow-row auto-rows-auto gap-3 grid-flex-row p-2 rounded-lg overflow-y-auto">
                        {/* {searchGroup.map(item => {return(<SearchResultsCard key={item.id} item={item} />)})} */}

                        {search.movie && (    
                            <div>
                                <p className="w-full h-12 text-lg font-bold">Movies</p>
                                <div className="h-auto m-auto w-5/6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {search.movie.map((item) => {
                                        return (
                                            <SearchResultsCard key={item.id} item={item} />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        
                        {search.tv && (    
                            <div>
                                <p className="w-full h-12 text-lg font-bold">Tv</p>
                                <div className="h-auto m-auto w-5/6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {search.tv.map((item) => {
                                        return (
                                            <SearchResultsCard key={item.id} item={item} />
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {search.person && (    
                            <div>
                                <p className="w-full h-12 text-lg font-bold">People</p>
                                <div className="h-auto m-auto w-5/6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {search.person.map((item) => {
                                        return (
                                            <SearchResultPersonCard key={item.id} item={item} />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    };
}

export default SearchResults;