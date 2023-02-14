import { Fragment, useEffect, useRef, useState } from 'react';
import { SEARCH_RESULTS_TMDB } from '../../lib/constants';

import useSearchDebounce from '../../hooks/useSearchDebounce';
import SearchCard from '../Playlists/UI/SearchCard';
import { HiOutlineSearch } from 'react-icons/hi';
import LoadingSpinner from './LoadingSpinner';

const SearchBar = () => {
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
            setResults(items.results);

            setLoading(false);
        };

        if (debounceSearch) { searchData() };

    }, [debounceSearch]);

    return (
        <Fragment>
            <div className="w-full h-full inline-grid">
                <div className="h-8 w-full px-5 flex justify-center items-center mx-auto mb-5">
                    <div className="
                            relative w-5/6 h-7 m-auto border-ec-purple/50 border-2 rounded-lg 
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
                <div className="h-auto w-full flex">
                    <ul className="h-full w-full grid grid-cols-2 gap-2 relative">
                        {results.map(item => {
                            return <SearchCard key={item.id} item={item} />
                        }).slice(0,4)}
                    </ul>
                </div>
                
                

                {/* <div>
                    {results.map(item => {
                        return <PosterCard key={item.id} item={item} />
                    })}
                </div> */}

            </div>

        </Fragment>
    );
};

export default SearchBar;