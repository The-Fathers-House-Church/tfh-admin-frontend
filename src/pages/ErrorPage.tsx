import { useRouteError } from 'react-router';
import AppLayout from '../layout/AppLayout';
import { useAppSelector } from '../store/hooks';

function ErrorPage() {
	const error: any = useRouteError();
	const user = useAppSelector((state) => state.user.user);

	return (
		<AppLayout
			childrenStyle={
				!user
					? {
							left: 0,
							right: 0,
							margin: 'auto',
					  }
					: {}
			}
			showPageHeader={false}
		>
			<div className='flex items-center justify-center min-h-main flex-col dark:text-white'>
				<h1 className='text-3xl font-bold'>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error.statusText || error.message}</i>
				</p>
			</div>
		</AppLayout>
	);
}

export default ErrorPage;
