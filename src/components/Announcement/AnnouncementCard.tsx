import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card/Card';
import { AnnouncementType } from '../../../types/types';
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
      onClick={() => navigate('/announcement/view/' + announcement?.id)}
    >
      <article>
        <img
          src={announcement.image || DefaultImage}
          alt='Poster'
          className='object-cover h-36 w-full rounded-t-lg'
        />
        <div className='flex flex-col flex-wrap gap-2 p-5'>
          <span className='font-bold text-lg'>{announcement.title}</span>
          <div className='flex items-center gap-1'>
            <span className='text-sm'>Priority: </span>
            <span className='text-sm'>{announcement.priority}</span>
          </div>
          {announcement.details && (
            <div className='flex items-center gap-1'>
              <span className='text-sm'>Details: </span>
              <div
                className='text-sm line-clamp'
                dangerouslySetInnerHTML={{ __html: announcement.details }}
              />
            </div>
          )}
          <div className='flex items-center justify-center mt-5 gap-5'>
            <FiEdit
              onClick={(e) => {
                e.stopPropagation(); // this is because the entire card is clickable
                navigate('/announcement/edit/' + announcement?.id);
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
