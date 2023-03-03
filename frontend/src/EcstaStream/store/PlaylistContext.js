import { createContext, useContext, useReducer } from 'react';

export const PlaylistContext = createContext(null);
export const PlaylistDispatchContext = createContext(null);

const initialData = [];

export function PlaylistProvider({children}) {   
    const [listData, dispatch] = useReducer(
        playlistReducer,
        initialData
    );

    return (
        <PlaylistContext.Provider value={listData}>
            <PlaylistDispatchContext.Provider value={dispatch}>
                {children}
            </PlaylistDispatchContext.Provider>
        </PlaylistContext.Provider>
    );
}

export function usePlaylistData() {
    return useContext(PlaylistContext);
}

export function usePlaylistDispatch() {
    return useContext(PlaylistDispatchContext);
}

function playlistReducer(listData, action) {
    console.log(listData)
    switch(action.type) {
        case 'added': {
            return [...listData, {
                playlist_id: action.playlist_id,
                id: action.id,
                media_type: action.media_type
            }];
        }
        case 'deleted': {
            return listData.filter(x => x.id !== action.id);       
        }
        default: {
            throw Error('Error: ' + action.type);
        }
    }
}

