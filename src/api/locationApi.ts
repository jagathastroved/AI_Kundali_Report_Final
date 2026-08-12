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
    const country = (countryName || 'India').trim();
    const cleanQuery = query.trim();
    const url = `https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${encodeURIComponent(country)}/${encodeURIComponent(cleanQuery)}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.warn('First location search attempt failed, retrying...', error);
        try {
            await new Promise(res => setTimeout(res, 300));
            const retryResponse = await axios.get(url);
            return retryResponse.data;
        } catch (retryError) {
            console.error('Location search failed after retry:', retryError);
            throw new Error('Failed to search location');
        }
    }
};
