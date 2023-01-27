import React from 'react';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '../../../store/hooks';
import Button from '../../../common/Button/Button';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../../store/slices/loadingIndicator';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserSession } from '../../../functions/userSession';
import { appAxios } from '../../../api/axios';

function AddGalleryImages() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();
  const { id } = useParams();

  const [galleryImages, setGalleryImages] = React.useState<any[]>([]);

  const uploadImages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!galleryImages.length) {
      return sendFeedback('Select at least one image', 'error');
    }

    try {
      dispatch(openLoadingIndicator({ text: 'Uploading' }));

      const formData = new FormData();

      // append images
      galleryImages.map((file) => formData.append('images', file));

      const response = await appAxios.post(`/event/${id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: currentUser ? 'Bearer ' + currentUser?.token?.token : null,
        },
      });

      sendFeedback(response.data?.message, 'success');
      navigate(`/event/gallery/${id}`);
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <form onSubmit={(e) => uploadImages(e)}>
      <div className='flex flex-col gap-2 mb-5'>
        <label htmlFor='galleryImages'>Select images to upload</label>
        <input
          type='file'
          name='galleryImages'
          id='galleryImages'
          multiple
          className='border-lightGrey border-2 '
          accept='image/*'
          onChange={(e: any) => {
            const file = Array.prototype.slice.call(e.target.files);
            setGalleryImages(file);
          }}
        />
      </div>
      <Button type='submit'>Upload Images</Button>
    </form>
  );
}

export default AddGalleryImages;
