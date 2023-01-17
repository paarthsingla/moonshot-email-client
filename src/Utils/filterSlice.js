import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    readMails: [],
    favMails:[],
    bodyDisplayId: '',
    filterBy: ''
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addReadMail(state, action) {
            if(!state.readMails.includes(action.payload)) state.readMails.push(action.payload);
        },
        addFavMail(state, action) {
            if(!state.favMails.includes(action.payload)) state.favMails.push(action.payload);
        },
        removeFavMail(state, action) {
            state.favMails = state.favMails.filter(v=>v!==action.payload);
        },
        setState(state, action) {
            state.favMails = action.payload.favMails;
            state.readMails = action.payload.readMails;
        },
        setBodyDisplayId(state, action) {
            state.bodyDisplayId = action.payload;
        },
        setFilterBy(state, action) {
            state.filterBy = action.payload;
        }
    }
});

export const { addReadMail, addFavMail, removeFavMail, setBodyDisplayId, setFilterBy, setState } = filterSlice.actions;

export default filterSlice.reducer;