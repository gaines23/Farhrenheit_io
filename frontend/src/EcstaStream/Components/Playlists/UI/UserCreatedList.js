import { Fragment, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../../../Components/UI/LoadingSpinner";
import useHttp from "../../../../hooks/use-http";
import { getUserProfile } from "../../../lib/ec-api";

import PlaylistCard from "../UI/PlaylistCard";

let user_token = localStorage.getItem('token'); 

const UserCreatedList = () => {
    const { sendRequest, status, data: userProfile } = useHttp(getUserProfile, true);
    const [getUserPlaylists, setUserPlaylists] = useState([]);

    const history = useHistory();

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const submitNewPlaylist = async (e) => {
        e.preventDefault();

        const url = process.env.REACT_APP_EC_USER_PLAYLISTS;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ 
                    title: 'Always On Repeat', 
                    description: 'Start creating your new playlist here!', 
                    private: true 
                }),
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`,
                },
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message);
            }

            if (response.ok) {
                history.push('/fahrenheit/ecstastream/playlist/details/:id/:title/:user_id');
                // build this out -> single playlist page
            }
            
            return null;
        } catch {
            console.log('problem saving playlist');
        }

    }

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (status === 'completed' ) {
        console.log(userProfile.user_playlists)
    }
    
   
    if (status === 'completed' && userProfile.user_playlists !== '') {
        return (
            <Fragment>
                <div className="mt-5 mb-5">
                    <p className="w-full text-lg">My Playlists ({userProfile.user_playlists.length})</p>
                    <div
                        className="h-full flex items-center px-5 py-1 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent"
                    >
                    {userProfile.user_playlists.map(playlist => { 
                        return (
                            <PlaylistCard key={playlist.ec_playlist_id} playlist={playlist} />
                        );
                    })}
                    </div>
                </div>
            </Fragment>
        );
    }
        else
    {
       return (

            <Fragment>
                <div className="mt-5 mb-5">
                    <p className="w-full text-lg">{`My Playlists (1)`}</p>
                    <div className="w-28 h-36 mt-3 inline-block rounded-md border border-input-fill/30">   
                        <button 
                            className="h-full w-full p-1 mx-auto"
                            onClick={submitNewPlaylist}
                        >
                            <div className="h-full w-24 p-1 mx-auto relative">
                                <h1 className="h-auto w-full absolute mx-auto text-input-fill text-lg text-left inset-x-0 bottom-0">
                                    Always On Repeat
                                </h1>
                            </div>
                        </button>
                    </div>
                </div>
            </Fragment>
        );   
    }
     
}

export default UserCreatedList;