import axios from 'axios';
const priceList = async () => {
    try {
        const priceList = await axios.get('https://webservice.astroved.com/api/Product/GetProdsByProdIdForAllCurrency/88426/en-US/1')
        return priceList.data
    } catch (error) {
        console.error('Price list Fetching failed', error)
    }
}

export default priceList; 