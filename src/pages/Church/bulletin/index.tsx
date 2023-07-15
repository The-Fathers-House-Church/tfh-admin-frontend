import React from 'react';
import { getUserSession } from '../../../functions/userSession';
import { sendCatchFeedback } from '../../../functions/feedback';
import { appAxios } from '../../../api/axios';
import AppLayout from '../../../layout/AppLayout';
import BackButton from '../../../common/Button/BackButton';
import Loader from '../../../common/Loader/Loader';
import DeleteSubscriberModal from '../../../components/Church/DeleteSubscriberModal';
import { BulletinSubscriberType } from '../../../../types/types';
import BulletinCard from '../../../components/Church/BulletinCard';
import EditSubscriberModal from '../../../components/Church/EditSubscriberModal';
import Pagination from '../../../common/Pagination';

const BulletinSubscribers = () => {
  const [loading, setLoading] = React.useState(false);
  const currentUser = getUserSession();
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<BulletinSubscriberType[] | undefined>([]);
  // delete modal
  const [selectedData, setSelectedData] = React.useState<
    BulletinSubscriberType | undefined
  >(undefined);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const openDeleteModal = (data: BulletinSubscriberType) => {
    setSelectedData(data);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // edit modal
  const [editModal, setEditModal] = React.useState(false);
  const openEditModal = (data: BulletinSubscriberType) => {
    setSelectedData(data);
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await appAxios.get(`/bulletin/subscriber?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });
        setData(response.data.data?.data);
        setTotalResults(response.data.data?.totalResults);
      } catch (error) {
        setData([]);
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [page]);
  return (
    <AppLayout pageTitle='Bulletin Subscribers' pageAction={<BackButton />}>
      {loading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {data.map((subscriber) => (
              <BulletinCard
                subscriber={subscriber}
                key={subscriber.id}
                openDeleteModal={openDeleteModal}
                openEditModal={openEditModal}
              />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <span className='text-md'>No subscriber found</span>
      )}

      <DeleteSubscriberModal
        allData={data}
        setAllData={setData}
        closeModal={closeDeleteModal}
        openModal={deleteModal}
        selectedData={selectedData}
      />
      <EditSubscriberModal
        allData={data}
        setAllData={setData}
        closeModal={closeEditModal}
        openModal={editModal}
        selectedData={selectedData}
      />
    </AppLayout>
  );
};

export default BulletinSubscribers;
