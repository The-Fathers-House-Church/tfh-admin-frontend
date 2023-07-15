import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { appAxios } from '../../../api/axios';
import Loader from '../../../common/Loader/Loader';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { getUserSession } from '../../../functions/userSession';
import { EventType, SetState } from '../../../../types/types';

function ViewGallery({
  event,
  setEventDetails,
}: {
  event: EventType;
  setEventDetails: SetState<EventType | undefined>;
}) {
  const [loading, setLoading] = React.useState(false);
  const currentUser = getUserSession();

  const deleteImageFromGallery = async (id: number) => {
    if (confirm('Delete image from gallery?')) {
      try {
        setLoading(true);
        const response = await appAxios.delete('/event/gallery/' + event.id, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
          data: {
            image_id: id,
          },
        });
        setEventDetails({
          ...event,
          gallery: event.gallery.filter((image) => image.id !== id),
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
            <div className='relative' key={image.id}>
              <img
                src={image.imageURL}
                alt='Gallery'
                className='h-60 w-full object-cover rounded-sm'
              />
              <button
                className='shadow-md p-3 bg-primaryAccent1 rounded-sm absolute right-3 top-3 hover:bg-error hover:text-white duration-700'
                onClick={() => (!loading ? deleteImageFromGallery(image.id) : null)}
              >
                {loading ? (
                  <Loader className='w-5 h-5 border-lightGrey border-t-[#FF6634] border-2' />
                ) : (
                  <FiTrash2 />
                )}
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
