import LoginForm from '../../components/Authentication/Login/LoginForm';
import UpdatePasswordRequest from '../../components/Authentication/ResetPassword/UpdatePasswordRequest';
import AppLayout from '../../layout/AppLayout';

function ResetPasswordUpdate() {
	return (
		<AppLayout
			childrenStyle={{
				left: 0,
				right: 0,
				margin: 'auto',
			}}
			showPageHeader={false}
		>
			<div className='min-h-main flex items-center justify-center w-full dark:bg-mediumDark'>
				<UpdatePasswordRequest />
			</div>
		</AppLayout>
	);
}

export default ResetPasswordUpdate;
