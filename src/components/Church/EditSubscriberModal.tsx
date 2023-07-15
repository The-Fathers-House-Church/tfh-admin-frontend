import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { BulletinSubscriberType, SetState } from '../../../types/types';
import { getUserSession } from '../../functions/userSession';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropdown from '../../common/Dropdown/Dropdown';
import Checkbox from '../../common/Checkbox';

const EditSubscriberModal = ({
  closeModal,
  openModal,
  selectedData,
  allData,
  setAllData,
  navigateFunction,
}: {
  openModal: boolean;
  closeModal: () => void;
  selectedData: BulletinSubscriberType | undefined;
  allData?: BulletinSubscriberType[];
  setAllData?: SetState<BulletinSubscriberType[] | undefined>;
  navigateFunction?: () => void;
}) => {
  const dispatch = useAppDispatch();

  const formik = useFormik<{ subscribed: boolean | undefined }>({
    initialValues: {
      subscribed: selectedData?.subscribed,
    },
    onSubmit: () => {
      handleUpdate();
    },
    validationSchema: yup.object({
      subscribed: yup.boolean().required('Required'),
    }),
    enableReinitialize: true,
  });

  const handleUpdate = async () => {
    const currentUser = getUserSession();

    try {
      dispatch(openLoadingIndicator({ text: 'Updating Subscriber' }));
      const response = await appAxios.patch(
        '/bulletin/subscriber/' + selectedData?.id,
        {
          subscribed: formik.values.subscribed,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      setAllData &&
        setAllData(
          allData?.map((item: BulletinSubscriberType) => {
            if (item.id === selectedData?.id) {
              item.subscribed = formik.values.subscribed as boolean;
            }
            return item;
          })
        );

      closeModal();
      navigateFunction && navigateFunction();
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      dispatch(closeLoadingIndicator());
    }
  };
  return (
    <CustomModal modalState={openModal} closeModal={closeModal} title='Update Subscriber'>
      <div>
        <p className='text-center md:text-left mb-5'>
          Edit subscriber status for: ({selectedData?.address}).
        </p>
        <Checkbox
          checked={formik.values.subscribed}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name='subscribed'
          id='subscribed'
          label='Subscribed'
        />
        <div className='flex items-center justify-center gap-5 flex-wrap md:justify-start mt-10'>
          <Button className='md:max-w-[200px] bg-error' onClick={handleUpdate}>
            Update
          </Button>
          <Button className='md:max-w-[200px] bg-dark' onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditSubscriberModal;
