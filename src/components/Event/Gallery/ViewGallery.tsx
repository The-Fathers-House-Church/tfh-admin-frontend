import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { appAxios } from '../../../api/axios';
import Loader from '../../../common/Loader/Loader';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { getUserSession } from '../../../functions/userSession';
import { EventType, SetState } from '../../../types';

function ViewGallery({
  event,
  setEventDetails,
}: {
  event: EventType;
  setEventDetails: SetState<EventType | undefined>;
}) {
  const [loading, setLoading] = React.useState(false);
  const currentUser = getUserSession();

  const deleteImageFromGallery = async (imageURL: string) => {
    if (confirm('Delete image from gallery?')) {
      try {
        setLoading(true);
        const response = await appAxios.delete('/event/gallery/' + event._id, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
          data: {
            imageURL,
          },
        });
        setEventDetails({
          ...event,
          gallery: event.gallery.filter((image) => image !== imageURL),
        });
        sendFeedback(response.data?.message, 'success');

        setLoading(false);
      } catch (error) {
        setLoading(false);
        sendCatchFeedback(error);
      }
    }
  };

  return (
    <>
      {event.gallery.length ? (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
          {event.gallery.map((image) => (
            <div className='relative'>
              <img
                src={image}
                alt='Gallery'
                className='h-60 w-full object-cover rounded-sm'
              />
              <button
                className='shadow-md p-3 bg-primaryAccent1 rounded-sm absolute right-3 top-3 hover:bg-error hover:text-white duration-700'
                onClick={() => deleteImageFromGallery(image)}
              >
                {loading ? <Loader size={20} /> : <FiTrash2 />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>No gallery image added</>
      )}
    </>
  );
}

export default ViewGallery;
