import React from 'react';
import { getUserSession } from '../../../../functions/userSession';
import { AssignedVisitorType } from '../../../../../types/types';
import { appAxios } from '../../../../api/axios';
import { sendCatchFeedback } from '../../../../functions/feedback';
import AppLayout from '../../../../layout/AppLayout';
import BackButton from '../../../../common/Button/BackButton';
import { Link } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import Loader from '../../../../common/Loader/Loader';
import AssignedVisitorCard from '../../../../components/Visitation/AssignedVisitorCard';
import Pagination from '../../../../common/Pagination';
import DeleteAssignedVisitorModal from '../../../../components/Visitation/DeleteAssignedVisitorModal';

const AssignedFirstTimers = () => {
  const [loading, setLoading] = React.useState(false);
  const currentUser = getUserSession();
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<AssignedVisitorType[] | undefined>([]);
  // delete modal
  const [selectedData, setSelectedData] = React.useState<AssignedVisitorType | undefined>(
    undefined
  );
  const [deleteModal, setDeleteModal] = React.useState(false);
  const openDeleteModal = (data: AssignedVisitorType) => {
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

        const response = await appAxios.get(`/assigned-first-timer?page=${page}`, {
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
    <AppLayout pageTitle='Assigned First Time Visitors' pageAction={<BackButton />}>
      {loading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {data.map((visitor) => (
              <AssignedVisitorCard
                visitor={visitor}
                key={visitor.id}
                openDeleteModal={openDeleteModal}
              />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <span className='text-md'>No assignment found</span>
      )}
      <DeleteAssignedVisitorModal
        allData={data}
        setAllData={setData}
        closeModal={closeDeleteModal}
        openModal={deleteModal}
        selectedData={selectedData}
      />
    </AppLayout>
  );
};

export default AssignedFirstTimers;
