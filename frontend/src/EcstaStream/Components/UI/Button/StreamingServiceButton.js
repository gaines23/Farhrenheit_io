import { Fragment, useEffect, useState } from "react";
import useHttp from "../../../../hooks/use-http";
import { getServicesDetails } from "../../../lib/ec-api";
import LoadingSpinner from "../LoadingSpinner";

const StreamingServiceButton = ({service}) => {
    const { sendRequest, status, data:loadedServices } = useHttp(getServicesDetails, true);

    const [getServices, setServices] = useState([]);
    localStorage.getItem('services');

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const handleClick = (id) => {
        if(!getServices.includes(id)) {
            getServices.push(id);
        } else {
            const x = getServices.indexOf(id);
            getServices.splice(x, 1);
        }

        setServices([...getServices]);
    };

    useEffect(() => {
        localStorage.setItem('services', JSON.stringify(getServices));
    }, [getServices]);

    return (
        <Fragment>
            { status === 'pending' && 
                <LoadingSpinner />
            }
                                
            {status === 'completed' && loadedServices.map((service) => {
                return (
                    <li className="inline-flex h-10 w-12 my-1 mx-auto" key={service.provider_id}>
                        <button 
                            onClick={() => handleClick(service.provider_id)}
                                key={service.provider_id}
                                className= "w-10 h-10 mx-auto rounded-xl outline-none hover:scale-125 ease-in-out duration-700"
                            >
                            <img
                                id={"service_img_" + service.provider_name} 
                                //src={TMBD_POSTER_w45 + service.logo_path}
                                src={'/ServicesImages/' + service.provider_id + '.jpg'} 
                                alt={service.provider_name}
                                className={getServices.includes(service.provider_id) ? 
                                    "transition w-10 h-10 mx-auto rounded-xl outline outline-1 outline-input-fill shadow-sm shadow-input-fill" : 
                                    "transition w-10 h-10 mx-auto rounded-xl outline-none opacity-60 foucs:outline-none hover:outline hover:outline-1 hover:outline-input-fill hover:opacity-100"
                                }
                                title={service.provider_name}
                            />                                        
                        </button>
                    </li>
                )
            }).slice(0,40)}
        </Fragment>
    );
}

export default StreamingServiceButton;