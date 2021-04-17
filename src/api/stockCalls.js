import axios from 'axios';
let apiKey = process.env.VUE_APP_TWELVE_DATA_API_KEY;
let baseURL = 'https://api.twelvedata.com';

const callGetSymbol = async (search) => {
    return await axios.get(`${baseURL}/symbol_search?symbol=${search}`);
};

const getAllStocksAvailable = async (country) => {
    return await axios.get(`
    ${baseURL}/stocks?country=${country}`);
};

const callGetStockTimeSeries = async (search) => {
    return await axios.get(
        `${baseURL}/time_series?symbol=${search}&interval=1day&apikey=${apiKey}`
    );
};

const callGetStockQuote = async (search) => {
    return await axios.get(
        `${baseURL}/quote?symbol=${search}&apikey=${apiKey}`
    );
};

export {
    callGetSymbol,
    getAllStocksAvailable,
    callGetStockTimeSeries,
    callGetStockQuote,
};
