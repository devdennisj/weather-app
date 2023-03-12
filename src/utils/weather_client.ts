import axios from "axios";

const weatherClient = axios.create({
	baseURL: 'https://pro.openweathermap.org/data/2.5/forecast',
	params: {
		appid: import.meta.env.VITE_API_KEY
	}
});

interface HourlyParams {
	lon: number;
	lat: number;
}

export const hourly = ({ lon, lat }: HourlyParams) => `/hourly?lat=${lat}&lon=${lon}`;

export default weatherClient