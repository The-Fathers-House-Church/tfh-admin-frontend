import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card/Card';
import { AnnouncementType } from '../../types';
import DefaultImage from '../../assets/images/default.jpg';

function AnnouncementCard({
  announcement = null,
  openDeleteModal,
}: {
  announcement: AnnouncementType | null;
  openDeleteModal: (announcement: AnnouncementType) => void;
}) {
  const navigate = useNavigate();

  if (!announcement) return null;
  return (
    <Card
      className={`min-w-full p-0 shadow-sm cursor-pointer bg-primaryAccent2`}
      onClick={() => navigate('/announcement/view/' + announcement?._id)}
    >
      <article>
        <img
          src={announcement.poster || DefaultImage}
          alt='Poster'
          className='object-cover h-36 w-full rounded-t-lg'
        />
        <div className='flex flex-col flex-wrap gap-2 p-5'>
          <span className='font-bold text-lg'>{announcement.name}</span>
          <div className='flex items-center gap-1'>
            <span className='text-sm'>Date: </span>
            <span className='text-sm'>{new Date(announcement.date).toDateString()}</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-sm'>Theme: </span>
            <span className='text-sm'>{announcement.theme}</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-sm'>Allows Registration: </span>
            <span className='text-sm'>
              {announcement.allowRegistration ? 'Yes' : 'No'}
            </span>
          </div>
          <div className='flex items-center justify-center mt-5 gap-5'>
            <FiEdit
              onClick={(e) => {
                e.stopPropagation(); // this is because the entire card is clickable
                navigate('/announcement/edit/' + announcement?._id);
              }}
            />
            <FiTrash
              className='text-error'
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(announcement);
              }}
            />
          </div>
        </div>
      </article>
    </Card>
  );
}

export default AnnouncementCard;
