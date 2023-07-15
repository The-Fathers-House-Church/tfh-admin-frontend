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
    <nav className='lg:w-[15vw] md:w-[20vw] text-white bg-primary  pb-5 shadow  h-[calc(100vh-60px)] fixed top-[60px] hidden md:block'>
      <ul className='flex flex-col h-full overflow-y-auto'>
        {navLinks.map((item) => (
          <Link key={item.href} to={item.href}>
            <li
              className={`pt-[17px] pb-[17px] pl-[21px] pr-[21px] hover:bg-primaryAccent2 hover:text-dark  font-medium font-secondary text-sm flex gap-5 items-center text-white ${
                checkRouteMatch(item.href) &&
                'bg-primaryAccent1 text-blue !text-dark !font-bold'
              }`}
            >
              {item.label}
            </li>
          </Link>
        ))}
        <li
          className={`pt-[17px] pb-[17px] pl-[21px] pr-[21px] cursor-pointer hover:bg-primaryAccent2  font-medium font-secondary text-sm flex gap-5 items-center mt-auto text-error`}
          onClick={logoutUser}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
