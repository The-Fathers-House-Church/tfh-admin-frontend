import LoginForm from '../components/Login/LoginForm';
import AppLayout from '../layout/AppLayout';

function Login() {
	return (
		<AppLayout
			childrenStyle={{
				left: 0,
				right: 0,
				margin: 'auto',
			}}
		>
			<div className='min-h-main flex items-center justify-center w-full dark:bg-mediumDark'>
				<LoginForm />
			</div>
		</AppLayout>
	);
}

export default Login;
