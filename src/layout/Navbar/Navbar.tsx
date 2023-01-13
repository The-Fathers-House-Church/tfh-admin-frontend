import { Link } from 'react-router-dom';
import AvatarImage from '../../assets/brand/logo.png';
import { useAppSelector } from '../../store/hooks';
import LoggedInMenu from './LoggedInMenu';

function Navbar() {
	const user = useAppSelector((state) => state.user.user);

	return (
		<nav className='pt-0 pb-0 bg-white dark:bg-dark p-primary shadow-md h-[60px] flex flex-row items-center fixed z-10 top-0 left-0 right-0'>
			<div className='flex flex-row items-center justify-between w-full'>
				<Link to='/'>
					<img
						src={AvatarImage}
						alt='Landshop'
						width={50}
						height={50}
						className='cursor-pointer object-cover'
					/>
				</Link>

				{user ? (
					<LoggedInMenu />
				) : (
					<>
						<div className='flex flex-row items-center gap-[30px]'>
							<Link to='/login'>
								<span className='dark:text-white cursor-pointer hover:text-secondary dark:hover:text-secondary font-medium'>
									Login
								</span>
							</Link>
							{/* <Link to='/register'>
								<span className='dark:text-white cursor-pointer hover:text-secondary dark:hover:text-secondary font-medium'>
									Register
								</span>
							</Link> */}
						</div>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
