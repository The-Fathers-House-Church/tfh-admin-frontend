import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '../../assets/icons/menu.png';
import { useAppDispatch } from '../../store/hooks';
import { signOut } from '../../store/slices/user';
import navLinks from '../navLinks';

function LoggedInMenu() {
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const logoutUser = () => {
		dispatch(signOut());
		navigate('/login');
	};
	return (
		<ClickAwayListener onClickAway={() => setOpen(false)}>
			<div className='relative'>
				<button onClick={() => setOpen(true)} className='flex items-center relative'>
					<img src={MenuIcon} alt='Menu' className='dark:invert' width={20} />
				</button>
				{open && (
					<nav
						className='rounded absolute right-0 top-10 bg-white w-40'
						style={{ boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1)' }}
					>
						<ul className='flex flex-col'>
							{navLinks.map((item) => (
								<Link to={item.href} key={item.href}>
									<li className='p-2 hover:bg-lightDark hover:text-white text-sm'>
										{item.label}
									</li>
								</Link>
							))}

							<li
								className='p-2 text-sm hover:bg-lightDark text-error hover:text-white cursor-pointer'
								onClick={logoutUser}
							>
								Logout
							</li>
						</ul>
					</nav>
				)}
			</div>
		</ClickAwayListener>
	);
}

export default LoggedInMenu;
