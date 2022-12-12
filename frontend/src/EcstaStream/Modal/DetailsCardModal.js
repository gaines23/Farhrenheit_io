import { Fragment, useEffect } from "react"
import useHttp from '../hooks/use-http';

import { getMovieCardDetails } from '../lib/tmdb-api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { MdOutlineCancel } from 'react-icons/md';

import hearteyes from '../assets/hearteyes.png';
import sleeping from '../assets/sleeping.png';
import { AiOutlineCheckCircle, AiOutlineHeart, AiOutlineEllipsis } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { Tooltip } from "react-bootstrap";
//import StreamingList from "../StreamingList";

const DetailsCardModal = ({setShowModal, id}) => {
    const { sendRequest, status, data: loadedDetails, error } = useHttp(getMovieCardDetails, true);

    useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);

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

    let trailer = loadedDetails.videos.results[0].key;
    let release_date = loadedDetails.release_date;

    const optionListClassName = "h-12 w-3/4 mb-2 float-right hover:text-input-fill";
    const optionsLinkClassName = "h-10 w-full m-auto"
    const optionsClassName = "w-1/5 h-6 float-left";
    const optionNameClassName = "w-4/5 h-full pl-3 text-left float-right"; 



    return (
      <Fragment>
        <div className=" justify-center items-center flex outline-none focus:outline-none">
          <div className="relative w-2/3 h-2/3 my-6 mx-auto max-w-xl bg-bg-fill/90 backdrop-blur-sm backdrop-contrast-100 rounded-lg">
            <div className="h-full w-full border-0 bg-gradient-to-br from-ec-purple-text/50 to-ec-orange/50 shadow-lg rounded-lg relative flex flex-col outline-none focus:outline-none">
                <div className="flex text-input-fill items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                    <div className="w-3/4 h-full float-right">
                        <h3 className="text-2xl font-semibold">
                            {loadedDetails.title}
                        </h3>
                        <p className="text-md text-input-fill">{release_date}</p>
                    </div> 

                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-input-fill float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                    <MdOutlineCancel className="text-input-fill/20 hover:text-input-fill/80" />
                    </button>
                </div>

                <div className="relative h-auto my-4 px-4 py-3 flex-auto bg-input-fill/40 rounded-md">
                    <div>
                        {/* {!not_streaming && (services.map((service) => {return (<StreamingList key={service.provider_id} service={service} />)}))} */}
                        {loadedDetails.streaming !== undefined && (<div>+ Waitlist</div>)}
                    </div>

                    <div className="w-1/3 h-16 float-right">
                        <div className="w-full h-16 p-2 flex items-center justify-center">
                            <div className="w-2/3 h-16 m-auto">
                                <Tooltip title="Love It!">
                                    <img
                                    src={hearteyes}
                                    alt="hearteyes"
                                    className="float-left h-10 w-10 object-cover m-auto relative top-2 hover:scale-125 ease-in-out duration-700"
                                    />
                                </Tooltip>

                                <Tooltip title="Sleeping On It">
                                    <img
                                    src={sleeping}
                                    alt="sleeping"
                                    className="float-right h-10 w-10 object-cover m-auto relative top-2 hover:scale-125 ease-in-out duration-700"
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <ul className="w-full h-auto float-right p-2 mt-5">
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
                                    Watch List
                                </p>
                            </li>
                            <li className="h-12 w-1/3 mb-2 float-right hover:text-input-fill">
                                <Tooltip title="More Options">
                                    <AiOutlineEllipsis className="w-full h-6 float-right flex items-centered justify-center" />
                                </Tooltip>
                            </li>
                        </ul>
                    </div>

                    <div className="w-2/3 float-left">
                        {trailer ? (<iframe
                            className="w-full rounded-md pointer-events-none "
                            height="200"
                            src={`https://www.youtube.com/embed/${trailer}`}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={id.name ? id.name : id.title}
                        ></iframe>) : <p>Trailer Unavailable</p>

                        }
                        

                        <p className="w-full h-20 items-center justify-center text-xs float-left p-3 text-input-fill leading-relaxed">
                            {loadedDetails.overview.substring(0, 150)}
                        </p>

                        <button className="text-input-fill float-right text-xs">
                            More...
                        </button>
                    </div>
                </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-input-fill background-transparent font-bold lowercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-400"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </Fragment>
    );
};

export default DetailsCardModal;