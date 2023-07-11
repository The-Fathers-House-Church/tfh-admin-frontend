import { useFormik } from 'formik';
import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import * as yup from 'yup';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useNavigate } from 'react-router-dom';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button/Button';
import { getUserSession } from '../../functions/userSession';
import Dropdown from '../../common/Dropdown/Dropdown';
import TextArea from '../../common/TextArea/TextArea';
import {
  ChurchType,
  TFCCCellType,
  TFCCLeaderType,
  TFCCZoneType,
} from '../../../types/types';
import Loader from '../../common/Loader/Loader';

function EditCellForm({ cell }: { cell: TFCCCellType }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = getUserSession();
  const [zones, setZones] = React.useState<TFCCZoneType[] | undefined>([]);
  const [churches, setChurches] = React.useState<ChurchType[] | undefined>([]);
  const [leaders, setLeaders] = React.useState<TFCCLeaderType[] | undefined>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getZones = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get(`/tfcc/zone`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setZones(response.data.data);
      } catch (error) {
        setZones([]);
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };
    const getChurches = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get(`/church`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setChurches(response.data.data);
      } catch (error) {
        setChurches([]);
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };
    const getLeaders = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get(`/tfcc/leader?page=1&&limit=1000`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setLeaders(response.data.data.data);
      } catch (error) {
        setLeaders([]);
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };
    getZones();
    getChurches();
    getLeaders();
  }, []);

  interface Center {
    cellLeaderLabel: string;
    cellLeader: number;
    church: string;
    churchLabel: string;
    zone: string;
    zoneLabel: string;
    address: string;
  }

  const formik = useFormik<Center>({
    initialValues: {
      cellLeaderLabel: cell.cell_leader,
      cellLeader: cell.cell_leader_id,
      church: cell.church_id,
      churchLabel: cell.church.church_label,
      zone: cell.zone_id,
      zoneLabel: cell.tfccZone.zonal,
      address: cell.host_address,
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      cellLeader: yup.string().required('Cell leader is required'),
      church: yup.string().required('Church is required'),
      zone: yup.string().required('Zone is required'),
      address: yup.string().required('Address is required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Updating Center' }));
    try {
      const response = await appAxios.patch(
        '/tfcc/cell/' + cell.cell_id,
        {
          cell_leader_id: formik.values.cellLeader,
          church_id: formik.values.church,
          zone_id: formik.values.zone,
          host_address: formik.values.address,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/tfcc/cell');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Dropdown
            values={
              churches
                ? churches?.map((church) => ({
                    label: church.church_label,
                    value: church.church_id,
                  }))
                : [{ label: '', value: '' }]
            }
            label='Church'
            name='church'
            defaultValue={{
              label: formik.values.churchLabel,
              value: formik.values.church,
            }}
            placeholder='Select Church'
            formik={formik}
            className='mb-5'
          />
          <Dropdown
            values={
              zones
                ? zones?.map((zone) => ({
                    label: zone.zonal,
                    value: zone.zone_id,
                  }))
                : [{ label: '', value: '' }]
            }
            label='Zone'
            name='zone'
            defaultValue={{
              label: formik.values.zoneLabel,
              value: formik.values.zone,
            }}
            placeholder='Select TFCC Zone'
            formik={formik}
            className='mb-5'
          />
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
            name='cellLeader'
            defaultValue={{
              label: formik.values.cellLeaderLabel,
              value: formik.values.cellLeader,
            }}
            placeholder='Select Cell Leader'
            formik={formik}
            className='mb-5'
          />

          <TextArea formik={formik} name='address' label='Address' className='mb-5' />

          <Button type='submit' className='mt-10'>
            Update Center
          </Button>
        </form>
      )}
    </>
  );
}

export default EditCellForm;
