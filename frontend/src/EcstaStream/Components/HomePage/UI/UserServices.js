import { Fragment, useEffect } from "react";
import useHttp from "../../../../hooks/use-http";
import { getUserProfile } from "../../../lib/ec-api";
import StreamingServiceCard from "../../UI/Card/StreamingServiceCard";
import LoadingSpinner from "../../UI/LoadingSpinner";

const UserServices = () => {
    const { sendRequest, status, data: userProfile, error } = useHttp(getUserProfile, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);


    if (error) {
        return (
            <p className='centered focused'>{error}</p>
        );
    }

    return (
        <Fragment>
            <div className="w-max mx-auto px-2">
                { status === 'pending' && <LoadingSpinner /> }
                
                {( status === 'completed' && userProfile !== null) && (
                    <Fragment>
                        {userProfile.streaming_list_info.map((service) => {
                            return (
                                <StreamingServiceCard key={service.provider_id} service={service}/>
                            );
                        })}
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}

export default UserServices;