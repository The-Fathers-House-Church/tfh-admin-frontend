import React from 'react';
import { getUserSession } from '../../../functions/userSession';
import { sendCatchFeedback } from '../../../functions/feedback';
import { appAxios } from '../../../api/axios';
import AppLayout from '../../../layout/AppLayout';
import BackButton from '../../../common/Button/BackButton';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import Loader from '../../../common/Loader/Loader';
import DeleteUnitModal from '../../../components/Church/DeleteUnitModal';
import UnitCard from '../../../components/Church/UnitCard';
import { UnitType } from '../../../../types/types';

const Units = () => {
  const [loading, setLoading] = React.useState(false);
  const currentUser = getUserSession();

  const [data, setData] = React.useState<UnitType[] | undefined>([]);
  // delete modal
  const [selectedData, setSelectedData] = React.useState<UnitType | undefined>(undefined);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const openDeleteModal = (data: UnitType) => {
    setSelectedData(data);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await appAxios.get(`/unit`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });
        setData(response.data.data);
      } catch (error) {
        setData([]);
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <AppLayout
      pageTitle='Church Units'
      pageAction={
        <div className='flex gap-2'>
          <BackButton />
          <Link to='/church/units/new'>
            <Button className='!max-w-fit !w-[120px] !h-[40px] !p-4 bg-secondary'>
              Add Unit
            </Button>
          </Link>
        </div>
      }
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {loading ? (
          <Loader />
        ) : data && data.length > 0 ? (
          data.map((unit) => (
            <UnitCard unit={unit} key={unit.id} openDeleteModal={openDeleteModal} />
          ))
        ) : (
          <span className='text-md'>No unit found</span>
        )}
      </div>

      <DeleteUnitModal
        allData={data}
        setAllData={setData}
        closeModal={closeDeleteModal}
        openModal={deleteModal}
        selectedData={selectedData}
      />
    </AppLayout>
  );
};

export default Units;
