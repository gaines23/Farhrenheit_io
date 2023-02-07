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

    if (status === 'completed') {
        console.log(userProfile.streaming_services)
        
    }

    if (error) {
        return (
            <p className='centered focused'>{error}</p>
        );
    }

    return (
        <Fragment>
            <div className="w-5/6 h-full mx-auto">
                <div className="w-max mx-auto">
                    { status === 'pending' && <LoadingSpinner /> }

                    { status === 'completed' && (
                        <Fragment>
                            {userProfile.streaming_list_info.map((service) => {
                                return (
                                    <StreamingServiceCard key={service.provider_id} service={service}/>
                                );
                            })}
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default UserServices;