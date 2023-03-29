import React from 'react';
import { FiEdit, FiImage, FiTrash } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { EventType } from '../../../types/types';
import DeleteEventModal from './DeleteEventModal';
import DefaultImage from '../../assets/images/default.jpg';
import Divider from '../../common/Divider/Divider';

const EventItem = ({
  title,
  content,
  multipleContent,
  joinMultipleContent,
  isBooleanValue,
  type,
}: {
  title: string;
  content?: string | boolean | number;
  multipleContent?: string[];
  joinMultipleContent?: boolean;
  isBooleanValue?: boolean;
  type?: 'html';
}) => (
  <>
    <div className={'flex items-start flex-wrap gap-3'}>
      <span className='font-bold'>{title}</span>
      {type === 'html' ? (
        <div dangerouslySetInnerHTML={{ __html: content as string }} />
      ) : (
        <>
          {isBooleanValue && <span>{content ? 'Yes' : 'No'}</span>}
          {content && <span className='capitalize'>{content}</span>}
          {multipleContent && !joinMultipleContent ? (
            <div className='flex flex-col gap-2'>
              {multipleContent.map((content) => (
                <span key={content}>{content}</span>
              ))}
            </div>
          ) : (
            <span>{multipleContent?.join(' , ')}</span>
          )}
        </>
      )}
    </div>
  </>
);

function ViewEventLayout({ event }: { event: EventType | undefined }) {
  const navigate = useNavigate();

  // delete modal
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  if (!event) return <>Event not found</>;

  return (
    <div>
      <article className='flex flex-col gap-5'>
        <img
          src={event.poster || DefaultImage}
          alt='Poster'
          className='object-cover h-60 w-full rounded-t-lg'
        />
        <EventItem title='Name:' content={event.name} />
        <EventItem title='Type:' content={event.eventType} />
        <EventItem title='Date:' content={new Date(event.date).toDateString()} />
        <EventItem title='Time:' content={event.time} />
        <EventItem title='Main Text:' content={event.mainText} />
        <EventItem title='Theme:' content={event.theme} />
        <EventItem title='Location:' content={event.location} />
        <EventItem title='Description:' content={event.description} type='html' />
        <EventItem
          title='Allows Registration:'
          content={event.allowRegistration}
          isBooleanValue
        />

        {event.allowRegistration && (
          <EventItem
            title='Required registration details:'
            content={event.requiredRegistrationDetails
              ?.map((item) => item.name.replace(/_/g, ' '))
              .join(', ')}
          />
        )}

        <EventItem
          title='Limited by Date:'
          content={event.limitedDateRegistration}
          isBooleanValue
        />

        {event.limitedDateRegistration && (
          <EventItem
            title='Date Limit:'
            content={new Date(event.registrationDateLimit).toDateString()}
          />
        )}

        <EventItem
          title='Limited by Number:'
          content={event.limitedNumberRegistration}
          isBooleanValue
        />
        {event.limitedNumberRegistration && (
          <EventItem title='Number Limit:' content={event.registrationNumberLimit} />
        )}
        <EventItem title='Gallery Images:' content={event.gallery.length || 0} />
      </article>

      {/* <h3 className='font-bold text-lg mb:5'>Gallery Images: </h3>
      {event.gallery.length ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {event.gallery.map((item: string) => (
            <img src={item} alt='Gallery' className='h-20 w-full object-cover' />
          ))}
        </div>
      ) : (
        <>No gallery image added</>
      )} */}

      <div className='flex items-center justify-center gap-5 mt-10'>
        <Link to={`/event/edit/${event._id}`} className='w-[200px]'>
          <Button>
            <FiEdit className='mr-5' />
            Edit
          </Button>
        </Link>
        <Link to={`/event/gallery/${event._id}`} className='w-[200px]'>
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

      <DeleteEventModal
        closeDeleteModal={closeDeleteModal}
        deleteModalOpen={deleteModalOpen}
        event={event}
        navigateFunction={() => navigate('/event')}
      />
    </div>
  );
}

export default ViewEventLayout;
