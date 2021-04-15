import axios from 'axios';
let apiKey = process.env.VUE_APP_TWELVE_DATA_API_KEY;
let baseURL = 'https://api.twelvedata.com';

const callGetSymbol = async (search) => {
    return await axios.get(`${baseURL}/symbol_search?symbol=${search}`);
};

const callGetStockTimeSeries = async (search) => {
    return await axios.get(
        `${baseURL}/time_series?symbol=${search}&interval=1day&apikey=${apiKey}`
    );
};

export { callGetSymbol, callGetStockTimeSeries };
