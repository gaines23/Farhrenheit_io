import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { getPlaylistData } from '../lib/ec-api';

export const PlaylistContext = createContext(null);
export const PlaylistDispatchContext = createContext(null);

export function PlaylistProvider({children, id}) {
    const {sendRequest, status, data: playlistData} = useHttp(getPlaylistData, true);
    const [getData, setData] = useState([]);

    useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);

    useEffect(() => {
        setData(playlistData); 
    }, [playlistData]);
    
    const [listData, dispatch] = useReducer(
        playlistReducer,
        getData
    );

    console.log(getData)
    if (status === 'completed' && getData !== null) {
        return (
            <PlaylistContext.Provider value={listData}>
                <PlaylistDispatchContext.Provider value={dispatch}>
                    {children}
                </PlaylistDispatchContext.Provider>
            </PlaylistContext.Provider>
        );
    }
}

export function usePlaylistData() {
    return useContext(PlaylistContext);
}

export function usePlaylistContext() {
    return useContext(PlaylistDispatchContext);
}

function playlistReducer(listData, action) {
    console.log(listData)
    switch(action.type) {
        case 'added': {
            return [...listData]
        }
        // case 'deleted': {
            
        // }
    }
}

