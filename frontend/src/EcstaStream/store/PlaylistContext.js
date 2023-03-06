import { createContext, useContext, useReducer } from 'react';

export const PlaylistContext = createContext([]);
export const PlaylistDispatchContext = createContext(null);

export function PlaylistProvider({children, getData}) {   
    const [listData, dispatch] = useReducer(
        playlistReducer,
        getData.getData
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
    
    switch(action.type) {
        case 'added': {
            const newId = listData.length + 1;
            return [{
                playlist_id: action.playlist_id,
                pl_data_id: newId,
                pl_mov_show_id: action.pl_mov_show_id,
                media_type: action.media_type,
            }, ...listData ];
            
        }
        case 'deleted': {
            return [...listData.filter(item => item.pl_data_id !== action.pl_data_id)];
        }
        default: {
            throw Error('Error: ' + action.type);
        }
    }
}
