import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import useHttp from '../../../../../hooks/use-http';

import { getMovieCardDetails } from '../../../../lib/tmdb-api';
import LoadingSpinner from '../../../../../Components/UI/LoadingSpinner';
import { MdOutlineCancel } from 'react-icons/md';

import hearteyes from '../../../../assets/hearteyes.png';
import sleeping from '../../../../assets/sleeping.png';
import { AiOutlineCheckCircle, AiOutlineHeart, AiOutlineEllipsis } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { Tooltip } from "react-bootstrap";

const MovieCardDropdown = ({setShowDetails, id, media_type}) => {
    const { sendRequest, status, data: loadedDetails } = useHttp(getMovieCardDetails, true);

    const mediaId = id;

    var type;
    if (media_type === 0) {
        type = 'movie';
    } else {
       type = 'tv';
    }
    
    const info = `${type}/${mediaId}`;

    useEffect(() => {
        sendRequest(info);
    }, [sendRequest]);

    if (status === 'pending') {
        return (
            <div>
                <LoadingSpinner />
            </div>
        );
    }

    let trailer = loadedDetails.videos.results[0].key;
    let release_date = loadedDetails.release_date;

    const optionListClassName = "h-12 w-3/4 mb-2 float-right hover:text-input-fill";
    const optionsLinkClassName = "h-10 w-full m-auto"
    const optionsClassName = "w-3/5 h-6 m-auto text-center";
    const optionNameClassName = "w-4/5 h-full m-auto pt-1 text-center text-xs"; 

    return (
        <Fragment>
            <div className="flex fixed w-fit h-auto mr-2 mb-2 rounded-lg bg-bg-fill/70 backdrop-blur-md backdrop-contrast-150 mx-1">
                <div className="h-auto md:h-92 lg:h-100 w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 bg-gradient-to-br from-ec-purple/50 to-ec-orange/50 rounded-lg bg-bg-fill/70">
                    <div className="w-full col-span-1 lg:col-span-2 flex text-input-fill px-2 py-1">
                        
                        <div className="w-full h-full grid grid-rows-auto">
                            <div className="w-full h-auto">
                                <button
                                    className="w-auto p-1 ml-auto bg-transparent border-0 text-input-fill float-left text-xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => {
                                        setShowDetails(false);
                                    }}
                                >
                                    <MdOutlineCancel className="text-input-fill/20 hover:text-input-fill/80" />
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="w-auto text-3xl font-extrabold">
                                    {loadedDetails.title}   
                                </p>
                            </div>
                            <div className="text-center">
                                { type === 'movie' ? 
                                    <p className="w-full text-xs font-thin text-input-fill">{release_date.slice(0,4)} | {loadedDetails.genres.map(x => x.name + ' | ')}</p>                            
                                :  
                                <>
                                    <p className="w-auto text-xs font-thin">{loadedDetails.first_air_date.slice(0,4)}</p>
                                    <p className="w-full text-xs font-thin text-input-fill"> {loadedDetails.number_of_seasons} Season(s) | {loadedDetails.genres.map(x => x.name + ' | ')}</p>   
                                </>
                                }
                            </div>

                            <div className="mt-1">
                                <ul className="flex">
                                    <li className={optionListClassName}>
                                        <div className={optionsLinkClassName}>
                                            <AiOutlineCheckCircle className={optionsClassName} />
                                        <p className={optionNameClassName}>
                                            Watched
                                        </p> 
                                        </div>
                                                                
                                    </li>
                                    <li className={optionListClassName}>
                                        <AiOutlineHeart className={optionsClassName} /> 
                                        <p className={optionNameClassName}>
                                            Favorite
                                        </p>
                                        
                                    </li>
                                    <li className={optionListClassName}>
                                        <RiComputerLine className={optionsClassName} /> 
                                        <p className={optionNameClassName}>
                                            Future
                                        </p>
                                    </li>
                                    <li className="h-12 w-1/3 mb-2 float-right hover:text-input-fill">
                                        <Tooltip title="More Options">
                                            <AiOutlineEllipsis className="w-full h-6 float-right flex items-centered justify-center" />
                                        </Tooltip>
                                    </li>
                                </ul> 
                            </div>
                                
                            <div className="w-full h-16">
                                <div className="w-full h-16 p-2 flex items-center justify-center">
                                    <div className="w-2/3 h-16 m-auto">
                                        <Tooltip title="Love It!">
                                            <img
                                            src={hearteyes}
                                            alt="hearteyes"
                                            className="float-left h-12 w-12 object-cover m-auto relative top-2 hover:scale-125 ease-in-out duration-700"
                                            />
                                        </Tooltip>

                                        <Tooltip title="Sleeping On It">
                                            <img
                                            src={sleeping}
                                            alt="sleeping"
                                            className="float-right h-12 w-12 object-cover m-auto relative top-2 hover:scale-125 ease-in-out duration-700"
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <p className="w-full h-auto items-center justify-center text-xs float-left p-3 text-input-fill leading-relaxed">
                                    {loadedDetails.overview.substring(0, 150)} {loadedDetails.overview.length > 150 && '...'}
                                </p>
                            </div>
                            <div className="w-full h-10">
                                <Link 
                                    to={{
                                        pathname: `/fahrenheit/ecstastream/details/${id}/movie`,
                                        state:{
                                            id: id, 
                                        }
                                    }}
                                >
                                    <button className="w-full text-sm h-10 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10">
                                        More...
                                    </button> 
                                </Link>
                            </div>
                                
                        </div>
                    </div>

                    <div className="w-full h-full col-start-2 col-span-2 md:col-span-5 lg:col-span-6 shadow-2xl shadow-black/60">
                        <iframe
                            className="w-full h-full rounded-lg pointer-events-none"
                            src={`https://www.youtube.com/embed/${trailer}`}
                            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={loadedDetails.name}
                        ></iframe>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default MovieCardDropdown;