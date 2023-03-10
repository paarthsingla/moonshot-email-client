import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    emailList: {},
    emailPage: 1,
    emailBody: ''
};

const URL_List = "https://flipkart-email-mock.now.sh/";
const URL_Body = "https://flipkart-email-mock.now.sh/?id=";

export const fetchEmailList = createAsyncThunk('fetchEmailList', async (pageNumber) => {
    let setURL = URL_List;
    if(pageNumber>0) setURL = setURL+'?page='+pageNumber;
    const {data} = (await axios.get(setURL));
    if(data) return data;
    return undefined;
});

export const fetchEmailBody = createAsyncThunk('fetchEmailBody', async (id) => {
    try {
        const {data} = (await axios.get(URL_Body+id));
        if(data) return data;
        return undefined;
    } catch (error) {
        return undefined;
    }
});

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setEmailPage(state, action) {
            state.emailPage = action.payload;
        },
        setEmailBody(state, action) {
            state.emailBody = action.payload;
        },
        setEmailList(state, action) {
            state.emailList = {};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEmailList.fulfilled, (state, action) => {
                state.emailList = action.payload.list.map(item=>{
                    item.from.name = item.from.name[0].toUpperCase()+item.from.name.slice(1);
                    const dateObject = new Date(item.date);
                    const month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
                    const ampm = (dateObject.getHours()<12)?'am':'pm';
                    const minutes = dateObject.getMinutes()+1;
                    const minutesFormat = (minutes<10)?'0'+minutes:minutes;
                    const hours = dateObject.getHours()+1;
                    const hoursFormat = (hours<10)?'0'+hours:hours;
                    const formatedDate = dateObject.getDate()+'/'+month[dateObject.getMonth()]+'/'+dateObject.getFullYear()+' '+hoursFormat+':'+minutesFormat+ampm;
                    item.date = formatedDate;
                    return item;
                })
            })
            .addCase(fetchEmailBody.fulfilled, (state, action) => {
                state.emailBody = (action.payload.body)?action.payload.body:'<strong>Error Fetching Data. Please Refresh.!</strong>';
            })
    }
});

export const { setEmailPage, setEmailBody, setEmailList } = emailSlice.actions;

export default emailSlice.reducer;