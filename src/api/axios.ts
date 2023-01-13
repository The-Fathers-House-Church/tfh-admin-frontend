import { API_URL } from './../functions/environmentVariables';
import axios from 'axios';

export const appAxios = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
	baseURL: API_URL,
});
