import { Fragment, useEffect } from "react";

import useHttp from '../../../hooks/use-http';
import { getServicesDetails } from "../../lib/ec-api";

import LoadingSpinner from "../UI/LoadingSpinner";
import SecondaryFilter from "./SecondaryFilter";
import StreamingListButton from "../UI/Button/StreamingListButton";
import StreamingListUsers from "../UI/StreamingListUsers";
import Trending from "./Trending";
import EcstaStream from '../../assets/EcstaStream.png';

const HomePageContent = () => {
    const { sendRequest, status, data: loadedServices, error } = useHttp(getServicesDetails, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <p className='centered focused'>{error}</p>
        );
    }

    if (status === 'completed' && (!loadedServices || loadedServices.length === 0)) {
        return
         
    }

    
    
    const mainListClassName = "flex w-1/3 h-10 items-center justify-center rounded-lg hover:bg-bg-fill/20 hover:backdrop-blur-lg hover:bg-opacity-10";
    const mainListParagraph = "m-auto h-1/2 text-input-fill font-light ";

    return (
        <Fragment>
            <div className="flex w-full h-8 justify-center">
                <img src={EcstaStream} alt="ec-main-logo" />
            </div>

            <div id="filterSection" className="flex flex-col w-full h-auto mt-5">
                <div id="filterTabs" className="flex h-10 w-full justify-center">
                    <ul className="flex w-2/3 text-center h-full rounded-lg">
                        <li className={mainListClassName}>
                        <p className={mainListParagraph}>Top 20 Services in US</p>
                        </li>
                        <li className={mainListClassName}>
                        <p className={mainListParagraph}>My Services</p>
                        </li>
                        <li className={mainListClassName}>
                        <p className={mainListParagraph}>Custom</p>
                        </li>
                    </ul>
                </div>
        
                <div id="streamingServicesList" className="flex justify-center items-center">
                    <div id="services" className="w-full p-2 h-full rounded-lg border border-input-fill/10 bg-bg-fill/10 backdrop-brightness-125 backdrop-opacity-10 rounded-md">
                        <StreamingListButton />
                        <div className="w-full h-16 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                            <ul className="px-3 h-12 inline-block w-auto gap-3">
                                {loadedServices.map((service) => {
                                    return (
                                        <StreamingListUsers key={service.provider_id} service={service} />
                                    );
                                }).slice(0,25)}
                            </ul>
                        
                        </div>
                    </div>
                </div>
            </div> 
            
            <SecondaryFilter />

            <Trending />
           
            
        </Fragment>
    );
};

export default HomePageContent;