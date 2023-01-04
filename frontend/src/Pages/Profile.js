import { Fragment, useEffect, useState } from "react";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getUserProfile } from "../lib/fahrenheit-api";
import NotFound from "./NotFound";

const Profile = () => {
    const [isAuth, setIsAuth] = useState(false);
    
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    const token = localStorage.getItem('token');
    
    const { sendRequest, status, data: profileDetails, error } = useHttp(getUserProfile, true);
    
    useEffect(() => {
        sendRequest(token);
    }, [sendRequest, token]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        <NotFound />
    }

    if (status === 'completed' && isAuth) {
        //console.log(profileDetails)
        return (
            <Fragment>
                <div>PROFILE</div>
                {profileDetails.username}
            </Fragment>
        );
    }

}

export default Profile;