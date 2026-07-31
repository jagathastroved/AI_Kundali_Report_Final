import axios from 'axios';
import fallbackReport from '../mocks/fallBackReport.json';

export interface ReportApiRequest {
  name: string;
  email: string;
  gender: string;
  datetime_local: string; // Format: "YYYY-MM-DDTHH:mm:ss"
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  ayanamsa: string
  house_system: string;
}

export const fetchReportFull = async (payload: ReportApiRequest) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://astropedia-ai.astroved.com/kundali-report';
  const url = `${baseUrl}/api/v1/report/full`;
  console.log("payload", payload)
  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('API failed.', error);
    throw error;
  }
};
