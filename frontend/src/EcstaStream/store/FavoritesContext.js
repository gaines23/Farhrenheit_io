import { createContext, useContext, useReducer } from 'react';

export const FavoritesContext = createContext([]);
export const FavoritesDispatchContext = createContext(null);

export function FavoritesProvider({children, getData}) {   
    const [listData, dispatch] = useReducer(
        favoritesReducer,
        getData.getData
    );

    return (
        <FavoritesContext.Provider value={listData}>
            <FavoritesDispatchContext.Provider value={dispatch}>
                {children}
            </FavoritesDispatchContext.Provider>
        </FavoritesContext.Provider>
    );
}

export function useFavoritesData() {
    return useContext(FavoritesContext);
}

export function useFavoritesDispatch() {
    return useContext(FavoritesDispatchContext);
}

function favoritesReducer(listData, action) {
    switch(action.type) {
        case 'added': {
            const newId = listData.length + 1;
            return [{
                favorites_id: action.favorites_id,
                fav_data_id: newId,
                fav_mov_show_id: action.fav_mov_show_id,
                media_type: action.media_type,
            }, ...listData];
        }
        case 'deleted': {
            return [...listData.filter(item => item.fav_data_id !== action.fav_data_id)];
        }
        default: {
            throw Error('Error: ' + action.type);
        }
    }
}