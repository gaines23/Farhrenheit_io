import { createContext, useContext, useReducer } from 'react';

export const WatchlistContext = createContext([]);
export const WatchlistDispatchContext = createContext(null);

export function WatchlistProvider({children, getData}) {   
    const [listData, dispatch] = useReducer(
        watchListReducer,
        getData.getData
    );

    return (
        <WatchlistContext.Provider value={listData}>
            <WatchlistDispatchContext.Provider value={dispatch}>
                {children}
            </WatchlistDispatchContext.Provider>
        </WatchlistContext.Provider>
    );
}

export function useWatchlistData() {
    return useContext(WatchlistContext);
}

export function usePlaylistDispatch() {
    return useContext(WatchlistDispatchContext);
}

function watchListReducer(listData, action) {
    
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
