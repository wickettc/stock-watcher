import axios from 'axios';
let apiKey = process.env.VUE_APP_ALPHA_VANTAGE_API_KEY;
let baseURL = 'https://www.alphavantage.co';

const callGetSymbol = async (search) => {
    return await axios.get(
        `${baseURL}/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${apiKey}`
    );
};

const callGetStock = async (search) => {
    return await axios.get(
        `${baseURL}/query?function=TIME_SERIES_INTRADAY&symbol=${search}&interval=5min&apikey=${apiKey}`
    );
};

export { callGetSymbol, callGetStock };
