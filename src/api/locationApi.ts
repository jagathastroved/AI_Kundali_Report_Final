import axios from 'axios';

export const fetchCountries = async () => {
    try {
        const response = await axios.get('https://www.astroved.com/new/json/Countries.json');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch countries');
    }
};

export const searchLocation = async (query: string, countryName?: string) => {
    try {
        const country = countryName || 'India';
        const response = await axios.get(`https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${encodeURIComponent(country)}/${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to search location');
    }
};
