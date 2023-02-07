//import { TMBD_POSTER_w45 } from "../../lib/constants";

import { useEffect } from "react";
import useHttp from "../../../../hooks/use-http";
import { getAllServices } from "../../../lib/ec-api";
import LoadingSpinner from "../LoadingSpinner";

const StreamingServiceCard = ({service}) => {
    const { sendRequest, status, data: loadedServices, error } = useHttp(getAllServices, true);

    useEffect(() => {
        sendRequest(service);
    }, [sendRequest]);
    
    return (
        <li className="inline-flex h-10 w-12 my-1 m-auto">
            {/* {isLoading && <LoadingSpinner />} */}
            <img 
                id={"service_img_" + service.provider_name} 
                //src={TMBD_POSTER_w45 + service.logo_path}
                src={'/ServicesImages/' + service.provider_id + '.jpg'} 
                alt={service.provider_name}
                className="h-10 w-10 mx-auto rounded-xl"
                title={service.provider_name}
            />
        </li>
    );
};

export default StreamingServiceCard;