import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import StreamingServiceButton from "../Components/UI/Button/StreamingServiceButton";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { getServicesDetails } from "../lib/ec-api";

let user_id = localStorage.getItem('token');
let user_profile = process.env.REACT_APP_EC_PROFILE;

const StreamingListModal = ({setIsOpen, newFollower}) => {
    const { sendRequest, status, data:loadedServices } = useHttp(getServicesDetails, true);

    const [getService, setService] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const handleClick = (id) => {
        if(!getService.includes(id)) {
            getService.push(id);
//            setChecked(checked);
        } else {
            const x = getService.indexOf(id);
            getService.splice(x, 1);

//            setChecked(!checked);
        }

        console.log(getService)
    };

    return (
        <Fragment>
            <div id="modalWrapper" className="text-input-fill flex h-full w-3/5 mx-auto z-50 justify-center items-center overflow-hidden outline-none focus:outline-none">
                <div className="relative h-5/6 w-4/5 m-auto border-0 rounded-lg shadow-lg bg-gradient-to-br from-ec-purple to-ec-orange rounded-lg bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-center text-left p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="w-full text-2xl font-semibold text-input-fill">
                            First, <br />
                            Add Your Streaming Services
                        </h3>
                    </div>

                    <div className="h-2/3 w-full grid p-5 overflow-x-hidden">
                        <ul className="w-11/12 h-full mx-auto grid-flow-colitems-center justify-center auto-cols-max grid-rows-auto my-4 text-slate-500 text-lg leading-relaxed">
                            { status === 'pending' && 
                                <LoadingSpinner />
                            }
                                
                            {status === 'completed' && loadedServices.map((service) => {
                                return (
                                    <li className="inline-flex h-10 w-12 my-1 m-auto">
                                        <button 
                                            onClick={() => handleClick(service.provider_id)}
                                            key={service.provider_id}
                                        >
                                            <StreamingServiceButton key={service.provider_id} service={service} />                                        
                                        </button>
                                    </li>
                                )
                            }).slice(0,40)}
                        </ul>
                    </div>

                    <div className="h-16 flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="w-28 h-7 text-input-fill background-transparent font-bold lowercase text-sm outline-none focus:outline-none hover:bg-input-fill/10 rounded-lg mr-1 mb-1"
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            {newFollower ? 'Skip' : 'Close'}
                        </button>
                        <button
                            className='w-28 text-xs h-7 shadow-sm shadow-black/20 font-bold border-solid uppercase border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10'
                            type="button"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </Fragment>
    );
};

export default StreamingListModal;