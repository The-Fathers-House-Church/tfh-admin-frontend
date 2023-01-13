export const getUserSession = () => {
	const user = JSON.parse(localStorage.getItem('user') || '{}');
	return user;
};
