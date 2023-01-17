import { toast } from 'react-toastify';

type Type = 'success' | 'info' | 'warning' | 'error';
type Message = string;

export const sendFeedback = (message: Message, type?: Type) => {
	toast[type || 'info'](message || (type === 'success' ? 'Successful' : 'Error'));
};

export const sendCatchFeedback = (error: any) => {
	toast.error(
		error.response?.data?.errors
			? error.response.data.errors[0].msg
			: error.response?.data?.message
			? error.response?.data?.message
			: 'Request unsuccessful'
	);
};
