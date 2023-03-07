import { Fragment, useEffect, useState } from 'react';
import { SEARCH_RESULTS_TMDB } from '../../lib/constants';

import useSearchDebounce from '../../hooks/useSearchDebounce';
import { HiOutlineSearch } from 'react-icons/hi';
import LoadingSpinner from '../UI/LoadingSpinner';
import WatchlistSearchCard from './WatchlistSearchCard';

const WatchListSearch = ({listId}) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const debounceSearch = useSearchDebounce(search, 500);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchData = async () => {
            setLoading(true);
            const url = `${SEARCH_RESULTS_TMDB}${search}`;
            
            const data = await fetch(url);
            const items = await data.json();
            setResults(
                items.results.slice(0,10)
                .sort((a, b) => (a.popularity < b.popularity))
            );

            setLoading(false);
        };

        if (debounceSearch) { searchData() };

    }, [debounceSearch]);

    const handleClick = (e) => {
        e.preventDefault();
        setSearch('');
        setResults([]);
    }


/*
    sm - 640
    md - 768
    lg - 1024
    xl - 1280
    2xl - 1536
*/

return (
        
        <Fragment>
            <div id="search" className="w-1/3 h-full px-4 flex flex-col">
            <h1 className="text-center my-3">Add To List:</h1>
            <div className="w-full h-full inline-table">
                <div className="h-8 w-full md:px-5  flex justify-center items-center mx-auto mb-5">
                    <div className="
                            relative w-5/6 sm:w-full h-7 m-auto border-ec-purple/50 border-2 rounded-lg 
                            hover:border-t-ec-purple/60 hover:border-r-ec-orange/40 
                            hover:border-l-ec-purple-text/60 hover:border-b-ec-orange/60"
                        >
                        
                        <input className="w-5/6 float-left text-input-full h-full bg-transparent pl-5 focus:outline-none" 
                            type="search"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            name="search"
                        />
                        <button
                            className="w-1/6 float-right bg-ec-purple-text/20 h-full items-center rounded-md hover:bg-gradient-to-br from-ec-purple/50 to-ec-orange/60"
                        >
                            <HiOutlineSearch className="stroke-1 stroke-white m-auto w-2/3" />
                        </button>
                    </div>
                </div>

                { loading && <LoadingSpinner /> }
                <div className="h-full w-full inline-flex overflow-y-scroll scroll-smooth scrollbar overflow-y scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                    <ul className="h-5/6 w-full grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-y-3 gap-x-1">
                        {results.map(item => {
                            return (
                            <li 
                                className="h-16 w-full lg:w-5/6 mx-auto flex bg-bg-fill/10 rounded-md text-input-fill/60"
                                key={item.id} 
                                onClick={handleClick}
                            >
                                <WatchlistSearchCard key={item.id} item={item} listId={listId} />
                            </li>
                        )}).slice(0,10)}
                    </ul>
                </div>
                
            </div>
        </div>
        </Fragment>
    );
};

export default WatchListSearch;