import { toast } from 'react-toastify';

type Type = 'success' | 'info' | 'warning' | 'error';
type Message = string;

export const sendFeedback = (message: Message, type?: Type) => {
  toast[type || 'info'](message || (type === 'success' ? 'Successful' : 'Error'));
};

export const sendCatchFeedback = (error: any) => {
  const possibleErrors = ['Login to continue!', 'jwt expired'];
  // If user's token is invalid, this message would be received.
  if (
    error.response?.data?.errors &&
    error.response.data.errors[0].msg &&
    possibleErrors.includes(error.response.data.errors[0].msg) // if one of the possible errors is sent
  ) {
    localStorage.removeItem('user');
    // Once token is cleared, reload and app would be redirected to login
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  toast.error(
    error.response?.data?.errors
      ? error.response.data.errors[0].msg
      : error.response?.data?.message
      ? error.response?.data?.message
      : 'Request unsuccessful'
  );
};
