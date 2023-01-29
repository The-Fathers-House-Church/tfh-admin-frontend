import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { FeedbackType } from '../../types';

function CardMenu({
  feedback,
  changeFeedbackStatus,
}: {
  feedback: FeedbackType;
  changeFeedbackStatus: (feedback: FeedbackType, newStatus: string) => void;
}) {
  return (
    <nav
      className='rounded absolute right-0 top-6 bg-white shadow-md w-40 z-10'
      style={{ boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1)' }}
    >
      <ul className='flex flex-col'>
        {feedback.status !== 'read' && (
          <li
            className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center  gap-2 duration-500'
            onClick={() => changeFeedbackStatus(feedback, 'read')}
          >
            <FiCheckCircle />
            Mark as read
          </li>
        )}
        {feedback.status !== 'unread' && (
          <li
            className='p-2 hover:bg-lightDark hover:text-white text-sm cursor-pointer flex items-center gap-2 duration-500'
            onClick={() => changeFeedbackStatus(feedback, 'unread')}
          >
            <FiXCircle />
            Mark as unread
          </li>
        )}
      </ul>
    </nav>
  );
}

export default CardMenu;
