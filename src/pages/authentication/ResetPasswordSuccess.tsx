import LoginForm from '../../components/Authentication/Login/LoginForm';
import ResetPasswordForm from '../../components/Authentication/ResetPassword/ResetPasswordForm';
import ResetPasswordSuccessCard from '../../components/Authentication/ResetPassword/ResetPasswordSuccessCard';
import AppLayout from '../../layout/AppLayout';

function ResetPasswordSuccess() {
	return (
		<AppLayout
			childrenStyle={{
				left: 0,
				right: 0,
				margin: 'auto',
			}}
			showPageHeader={false}
		>
			<div className='min-h-main flex items-center justify-center w-full'>
				<ResetPasswordSuccessCard />
			</div>
		</AppLayout>
	);
}

export default ResetPasswordSuccess;
