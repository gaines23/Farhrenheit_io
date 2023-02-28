import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = ({
    name: 'playlist',
    initialState: {
        items: [],
        changed: false,
    },
    reducers: {
        replacePlaylists(state, action) {
            state.items = action.payload.items;
        },
        addItemToPlaylist(state, action) {
            const newItem = action.payload;
            const exisitingItem = state.items.find(item => item.id === newItem.id);
            state.changed = true;
        }
    }


});

export const playistActions = playistActions.actions;
export default playlistSlice;