import { API_KEY, API_URL } from './../functions/environmentVariables';
import axios from 'axios';

export const appAxios = axios.create({
	headers: {
		'Content-Type': 'application/json',
		'x-api-key': API_KEY,
	},
	baseURL: API_URL,
});
