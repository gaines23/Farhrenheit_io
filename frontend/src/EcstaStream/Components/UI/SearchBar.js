import { Fragment, useEffect, useRef, useState } from 'react';
import { SEARCH_RESULTS_TMDB } from '../../lib/constants';

import useSearchDebounce from '../../hooks/useSearchDebounce';
//import PosterCard from '../UI/Card/PosterCard';
//import SearchResults from '../../Pages/SearchResults';
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
    console.log(results.slice(0,10))
    // const searchQuery = (e) => {
    //     setSearch(e.target.value);
    // }

    // const submitForm = async (e) => {
    //     e.preventDefault();

    //     const url = `${SEARCH_RESULTS_TMDB}${search}`;
        
    //     try {
    //         const data = await fetch(url);
    //         const items = await data.json();
    //         setResults(items.results);
    //     } catch(err) {
    //         console.log(err);
    //     }

    //     setSearch(e.target.reset());
    // };

    //console.log(search)

    return (
        <Fragment>
            <div className="w-full h-full flex">
                <div className="flex w-full h-10 w-4/5 justify-center items-center mx-auto">
                    <div className="
                            relative w-full h-8 m-auto border-ec-purple/50 border-2 rounded-lg 
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
                            type="submit"
                            // onClick={() => history.push({
                            //     pathname: `/fahrenheit/ecstastream/search/${search}`,
                            //     search: `?query=${search}`,
                            // })}
                        >
                            <HiOutlineSearch className="stroke-1 stroke-white m-auto w-2/3" />
                        </button>
                    </div>
                </div>

                { loading && <LoadingSpinner /> }
                    
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