import { FiArchive, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { TestimonyType } from '../../../types/types';

function CardMenu({
  testimony,
  changeTestimonyStatus,
  closeMenu,
}: {
  testimony: TestimonyType;
  changeTestimonyStatus: (
    testimony: TestimonyType,
    newStatus: 'pending' | 'approved' | 'declined' | 'archived'
  ) => void;
  closeMenu: () => void;
}) {
  return (
    <nav
      className='rounded absolute right-0 top-6 bg-white shadow-md w-40 z-10'
      style={{ boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1)' }}
    >
      <ul className='flex flex-col'>
        {testimony.status !== 'approved' && (
          <li
            className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center text-success gap-2 duration-500'
            onClick={() => {
              changeTestimonyStatus(testimony, 'approved');
              closeMenu();
            }}
          >
            <FiCheckCircle />
            Approve
          </li>
        )}
        {testimony.status !== 'declined' && (
          <li
            className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2 text-error duration-500'
            onClick={() => {
              changeTestimonyStatus(testimony, 'declined');
              closeMenu();
            }}
          >
            <FiXCircle />
            Decline
          </li>
        )}
        {testimony.status !== 'archived' && (
          <li
            className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2 text-gray-600 duration-500'
            onClick={() => {
              changeTestimonyStatus(testimony, 'archived');
              closeMenu();
            }}
          >
            <FiArchive />
            Archive
          </li>
        )}
      </ul>
    </nav>
  );
}

export default CardMenu;
