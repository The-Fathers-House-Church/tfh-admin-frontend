import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signOut } from '../../store/slices/user';
import navLinks from '../navLinks';

function Sidebar() {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const user = useAppSelector((state) => state.user.user);


	const checkRouteMatch = (route: string) => {
		const path = location.pathname;
		return path.includes(route);
	};

	const logoutUser = () => {
		dispatch(signOut());
		navigate('/login');
	};

	if (!user) return null;

	return (
		<nav className='dark:text-white w-[230px] text-black pt-5 pb-5 shadow dark:bg-dark h-[calc(100vh-60px)] sticky top-[60px] hidden lg:block pl-[25px] pr-[25px]'>
			<ul className='flex flex-col h-full'>
				{navLinks.map((item) => (
					<Link key={item.href} to={item.href}>
						<li
							className={`pt-[17px] pb-[17px] pl-[21px] dark:hover:bg-lightDark hover:bg-[#ECF9F6]  font-medium font-secondary text-sm flex gap-5 items-center rounded-[10px] text-[#808191]  ${checkRouteMatch(item.href) &&
								'bg-[#ECF9F6] text-blue dark:bg-lightDark dark:text-white dark:border-l-dark text-[#666666] !font-bold'
								}`}
						>
							{item.label}
						</li>
					</Link>
				))}
				<li
					className={`pt-[17px] pb-[17px] pl-[21px] dark:hover:bg-lightDark cursor-pointer hover:bg-[#ECF9F6]  font-medium font-secondary text-sm flex gap-5 items-center mt-auto rounded-[10px] text-error`}
					onClick={logoutUser}
				>
					Logout
				</li>
			</ul>
		</nav>
	);
}

export default Sidebar;
