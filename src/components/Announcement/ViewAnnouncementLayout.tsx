import React from 'react';
import { FiEdit, FiImage, FiTrash } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { AnnouncementType } from '../../types';
import DeleteAnnouncementModal from './DeleteAnnouncementModal';
import DefaultImage from '../../assets/images/default.jpg';
import Divider from '../../common/Divider/Divider';

const AnnouncementItem = ({
  title,
  content,
  multipleContent,
  joinMultipleContent,
  isBooleanValue,
}: {
  title: string;
  content?: string | boolean | number;
  multipleContent?: string[];
  joinMultipleContent?: boolean;
  isBooleanValue?: boolean;
}) => (
  <>
    <div className={'flex items-start flex-wrap gap-3'}>
      <span className='font-bold'>{title}</span>

      {isBooleanValue && <span>{content ? 'Yes' : 'No'}</span>}
      {content && <span>{content}</span>}
      {multipleContent && !joinMultipleContent ? (
        <div className='flex flex-col gap-2'>
          {multipleContent.map((content) => (
            <span>{content}</span>
          ))}
        </div>
      ) : (
        <span>{multipleContent?.join(' , ')}</span>
      )}
    </div>
  </>
);

function ViewAnnouncementLayout({
  announcement,
}: {
  announcement: AnnouncementType | undefined;
}) {
  const navigate = useNavigate();

  // delete modal
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  if (!announcement) return <>Announcement not found</>;

  return (
    <div>
      <article className='flex flex-col gap-5'>
        <img
          src={announcement.poster || DefaultImage}
          alt='Poster'
          className='object-cover h-60 w-full rounded-t-lg'
        />
        <AnnouncementItem title='Name:' content={announcement.name} />
        <AnnouncementItem
          title='Date:'
          content={new Date(announcement.date).toDateString()}
        />
        <AnnouncementItem title='Time:' content={announcement.time} />
        <AnnouncementItem title='Main Text:' content={announcement.mainText} />
        <AnnouncementItem title='Theme:' content={announcement.theme} />
        <AnnouncementItem
          title='Allows Registration:'
          content={announcement.allowRegistration}
          isBooleanValue
        />

        {announcement.allowRegistration && (
          <AnnouncementItem
            title='Required registration details:'
            content={announcement.requiredRegistrationDetails
              ?.map((item) => item.name.replace(/_/g, ' '))
              .join(', ')}
          />
        )}

        <AnnouncementItem
          title='Limited by Date:'
          content={announcement.limitedDateRegistration}
          isBooleanValue
        />

        {announcement.limitedDateRegistration && (
          <AnnouncementItem
            title='Date Limit:'
            content={new Date(announcement.registrationDateLimit).toDateString()}
          />
        )}

        <AnnouncementItem
          title='Limited by Number:'
          content={announcement.limitedNumberRegistration}
          isBooleanValue
        />
        {announcement.limitedNumberRegistration && (
          <AnnouncementItem
            title='Number Limit:'
            content={announcement.registrationNumberLimit}
          />
        )}
        <AnnouncementItem
          title='Gallery Images:'
          content={announcement.gallery.length || 0}
        />
      </article>

      {/* <h3 className='font-bold text-lg mb:5'>Gallery Images: </h3>
      {announcement.gallery.length ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {announcement.gallery.map((item: string) => (
            <img src={item} alt='Gallery' className='h-20 w-full object-cover' />
          ))}
        </div>
      ) : (
        <>No gallery image added</>
      )} */}

      <div className='flex items-center justify-center gap-5 mt-10'>
        <Link to={`/announcement/edit/${announcement._id}`} className='w-[200px]'>
          <Button>
            <FiEdit className='mr-5' />
            Edit
          </Button>
        </Link>
        <Link to={`/announcement/gallery/${announcement._id}`} className='w-[200px]'>
          <Button className='bg-dark'>
            <FiImage className='mr-5' />
            Gallery
          </Button>
        </Link>
        <Button className='max-w-[200px] bg-error' onClick={openDeleteModal}>
          <FiTrash className='mr-5' />
          Delete
        </Button>
      </div>

      <DeleteAnnouncementModal
        closeDeleteModal={closeDeleteModal}
        deleteModalOpen={deleteModalOpen}
        announcement={announcement}
        navigateFunction={() => navigate('/announcement')}
      />
    </div>
  );
}

export default ViewAnnouncementLayout;
