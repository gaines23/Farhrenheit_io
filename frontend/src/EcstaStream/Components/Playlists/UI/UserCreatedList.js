import { Fragment, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../../../hooks/use-http";
import { getAllUserPlaylists } from "../../../lib/ec-api";

import PlaylistCard from "../Cards/PlaylistCard";
import LoadingSpinner from "../../../../Components/UI/LoadingSpinner";

let user_token = localStorage.getItem('token'); 
let  new_pl_url = process.env.REACT_APP_EC_PLAYLIST_DETAILS;

const UserCreatedList = () => {
    const { sendRequest, status, data: userPlaylists } = useHttp(getAllUserPlaylists, true);

    const history = useHistory();

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const submitNewPlaylist = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${new_pl_url}actions/`, {
                method: 'POST',
                body: JSON.stringify({ 
                    title: 'Always On Repeat', 
                    description: 'Start adding your go-tos here!', 
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
                history.push(`/fahrenheit/ecstastream/playlist/details/${data.ec_playlist_id}/${data.slug}/${data.created_by}`);
            }
            
            return null;
        } catch {
            console.log('problem saving playlist');
        }

    }

    if (status === 'pending') {
        <LoadingSpinner />
    }
    
    if (status === 'completed') {
       console.log(userPlaylists)
        return (
            <Fragment>
                <div className="mt-5 mb-5">
                    <p className="w-full text-lg">
                        My Playlists {userPlaylists.length === 0 ? `(1)` : `(${userPlaylists.length})`}
                    </p>
                    
                    { userPlaylists.length === 0 ? 
                        (
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
                        ) :
                        (
                            <div
                                className="h-full flex items-center px-5 py-1 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent"
                            >
                                {userPlaylists.map(playlist => { 
                                    return (
                                        <PlaylistCard key={playlist.ec_playlist_id} playlist={playlist} />
                                    );
                                })}
                            </div>
                        )
                    }
                </div>
            </Fragment>
        );
    }     
}

export default UserCreatedList;