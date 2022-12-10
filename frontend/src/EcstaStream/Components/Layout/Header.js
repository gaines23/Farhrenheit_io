import { Link, useHistory, useLocation } from 'react-router-dom';
import { Fragment, useRef, useState } from 'react';
import { SEARCH_RESULTS_TMDB } from '../../lib/constants';

//import PosterCard from '../UI/Card/PosterCard';
//import SearchResults from '../../Pages/SearchResults';
import LogoPic from '../../assets/Logo-Final.png';

import { HiOutlineSearch } from 'react-icons/hi';

const Header = () => {
    
    const history = useHistory();
    const location = useLocation();
    const home = location.pathname;

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const searchRef = useRef(null);

    const searchQuery = (e) => {
        setSearch(e.target.value);
    }

    const submitForm = async (e) => {
        e.preventDefault();

        const url = `${SEARCH_RESULTS_TMDB}${search}`;
        
        try {
            const data = await fetch(url);
            const items = await data.json();
            setResults(items.results);
        } catch(err) {
            console.log(err);
        }

        setSearch(e.target.reset());
    };

    //console.log(search)

    return (
        <Fragment>
            <header className="w-auto h-full">
                <div className="flex items-center w-64 h-16 float-left">
                    {(home !== '/ecstastream') &&
                        <Link to={"/ecstastream"}>
                            <img src={LogoPic} className="w-3/5 h-15 ml-6 items-center" alt="mainLogo" />  
                        </Link>
                    }                
                
                </div>  
                <form className="flex w-auto h-16 w-3/5 justify-center items-center m-auto pt-4" onSubmit={submitForm}>
                    <div className="
                            relative w-3/5 h-10 m-auto border-ec-purple/50 border-2 rounded-lg 
                            hover:border-t-ec-purple/60 hover:border-r-ec-orange/40 
                            hover:border-l-ec-purple-text/60 hover:border-b-ec-orange/60"
                        >
                        
                        <input className="w-5/6 float-left text-input-full text-bold h-full bg-transparent pl-5 focus:outline-none" 
                            type="search"
                            placeholder="Search..."
                            value={search}
                            onChange={searchQuery}
                            name="search"
                            ref={searchRef}
                        />
                        <button
                            className="w-1/6 float-right bg-ec-purple-text/20 h-full items-center rounded-md hover:bg-gradient-to-br from-ec-purple/50 to-ec-orange/60"
                            type="submit"
                            onClick={() => history.push({
                                pathname: `/ecstastream/search/${search}`,
                                search: `?query=${search}`,
                            })}
                        >
                            <HiOutlineSearch className="stroke-1 stroke-white m-auto w-2/3" />
                        </button>
                    </div>
                </form>
                    
                {/* <div>
                    {results.map(item => {
                        return <PosterCard key={item.id} item={item} />
                    })}
                </div> */}

            </header>

        </Fragment>
    );
};

export default Header;