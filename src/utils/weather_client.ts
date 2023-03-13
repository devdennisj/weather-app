import axios from "axios";

const weatherClient = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5/forecast',
	params: {
		appid: import.meta.env.VITE_API_KEY,
		units: "metric"
	}

});

interface CityParams {
	city: string
}

export const city = ({ city }: CityParams) => `/?q=${city}`;

export default weatherClient