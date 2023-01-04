import { Fragment, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getUserProfile } from "../../lib/fahrenheit-api";
import NotFound from "../../Pages/NotFound";
import LoadingSpinner from "../UI/LoadingSpinner";

    const token = localStorage.getItem('token');

const UserProfile = () => {
    
    // const { sendRequest, status, data: profileDetails, error } = useHttp(getUserProfile, true);
    
    // useEffect(() => {
    //     sendRequest(token);
    // }, [sendRequest, token]);

    // if (status === 'pending') {
    //     <LoadingSpinner />
    // }

    // if (error) {
    //     return <NotFound />
    // }

    console.log(token)
    
        return (
            <Fragment>
                <div>PROFILE</div>
                {profileDetails}
            </Fragment>
        );
    }

export default UserProfile;