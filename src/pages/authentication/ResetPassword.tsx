import LoginForm from '../../components/Authentication/Login/LoginForm';
import ResetPasswordForm from '../../components/Authentication/ResetPassword/ResetPasswordForm';
import AppLayout from '../../layout/AppLayout';

function ResetPassword() {
	return (
		<AppLayout
			childrenStyle={{
				left: 0,
				right: 0,
				margin: 'auto',
			}}
		>
			<div className='min-h-main flex items-center justify-center w-full dark:bg-mediumDark'>
				<ResetPasswordForm />
			</div>
		</AppLayout>
	);
}

export default ResetPassword;
