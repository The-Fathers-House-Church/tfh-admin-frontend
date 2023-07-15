import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { VisitorType, SetState, TFCCLeaderType } from '../../../types/types';
import { getUserSession } from '../../functions/userSession';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropdown from '../../common/Dropdown/Dropdown';

const AssignVisitorModal = ({
  closeModal,
  openModal,
  selectedData,
  allData,
  setAllData,
  navigateFunction,
}: {
  openModal: boolean;
  closeModal: () => void;
  selectedData: VisitorType | undefined;
  allData?: VisitorType[];
  setAllData?: SetState<VisitorType[] | undefined>;
  navigateFunction?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<VisitorType | undefined>(undefined);
  const currentUser = getUserSession();
  const [leaders, setLeaders] = React.useState<TFCCLeaderType[] | undefined>([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        // Check if assignment exists
        const response = selectedData?.timer2
          ? await appAxios.get('/assigned-first-timer/view/' + selectedData?.id)
          : await appAxios.get('/assigned-second-timer/view/' + selectedData?.id);
        setData(response.data.visitor);
      } catch (error) {
        setData(undefined);
      }
    };

    const getLeaders = async () => {
      try {
        dispatch(openLoadingIndicator({ text: 'Retrieving Leaders' }));
        // Check if assignment exists
        const response = await appAxios.get(`/tfcc/leader?page=1&&limit=1000`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });
        setLeaders(response.data.data.data);
      } catch (error) {
        setLeaders(undefined);
      } finally {
        dispatch(closeLoadingIndicator());
      }
    };
    if (openModal) {
      getData();
      getLeaders();
    }
  }, [openModal]);

  interface Data {
    leader_id: string;
  }

  const formik = useFormik<Data>({
    initialValues: {
      leader_id: '',
    },
    onSubmit: () => {
      handleAssign();
    },
    validationSchema: yup.object({
      leader_id: yup.string().required('Select a TFCC Leader'),
    }),
  });

  const handleAssign = async () => {
    const currentUser = getUserSession();

    try {
      dispatch(openLoadingIndicator({ text: 'Assigning Visitor' }));
      const response = selectedData?.timer2
        ? await appAxios.post(
            '/assigned-second-timer/assign',
            {
              visitor_id: selectedData?.id,
              leader_id: formik.values.leader_id,
            },
            {
              headers: {
                Authorization: currentUser ? currentUser?.token : null,
              },
            }
          )
        : await appAxios.post(
            '/assigned-second-timer/assign',
            {
              visitor_id: selectedData?.id,
              leader_id: formik.values.leader_id,
            },
            {
              headers: {
                Authorization: currentUser ? currentUser?.token : null,
              },
            }
          );
      sendFeedback(response.data?.message, 'success');

      closeModal();
      navigateFunction && navigateFunction();
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      dispatch(closeLoadingIndicator());
    }
  };
  return (
    <CustomModal modalState={openModal} closeModal={closeModal} title='Assign Visitor'>
      {data && Object.keys(data).length > 0 ? (
        <>Visitor is already assigned</>
      ) : (
        <div>
          <Dropdown
            values={
              leaders
                ? leaders?.map((leader) => ({
                    label: leader.firstname + ' ' + leader.lastname,
                    value: leader.id,
                  }))
                : [{ label: '', value: '' }]
            }
            label='Cell Leader'
            name='leader_id'
            placeholder='Select Cell Leader'
            formik={formik}
            className='mb-10'
          />
          <div className='flex items-center justify-center gap-5 flex-wrap md:justify-start'>
            <Button className='md:max-w-[200px] bg-primary' onClick={handleAssign}>
              Assign
            </Button>
            <Button className='md:max-w-[200px] bg-gray-400' onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default AssignVisitorModal;
