import { createContext, useContext, useReducer } from 'react';

export const WatchlistContext = createContext([]);
export const WatchlistDispatchContext = createContext(null);

export function WatchlistProvider({children, getData}) {   
    const [listData, dispatch] = useReducer(
        watchlistReducer,
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

export function useWatchlistDispatch() {
    return useContext(WatchlistDispatchContext);
}

function watchlistReducer(listData, action) {
    switch(action.type) {
        case 'added': {
            const newId = listData.length + 1;
            return [{
                watchlist_id: action.watchlist_id,
                wl_data_id: newId,
                wl_mov_show_id: action.wl_mov_show_id,
                media_type: action.media_type,
            }, ...listData]; 
        }
        case 'deleted': {
            return [...listData.filter(item => item.wl_data_id !== action.wl_data_id)];
        }
        default: {
            throw Error('Error: ' + action.type);
        }
    }
}
