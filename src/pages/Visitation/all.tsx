import React from 'react';
import { getUserSession } from '../../functions/userSession';
import { VisitorType } from '../../../types/types';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import AppLayout from '../../layout/AppLayout';
import BackButton from '../../common/Button/BackButton';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import VisitorCard from '../../components/Visitation/VisitorCard';
import Pagination from '../../common/Pagination';
import DeleteVisitorModal from '../../components/Visitation/DeleteVisitorModal';

const AllVisitors = () => {
  const [loading, setLoading] = React.useState(false);
  const currentUser = getUserSession();
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<VisitorType[] | undefined>([]);
  // delete modal
  const [selectedData, setSelectedData] = React.useState<VisitorType | undefined>(
    undefined
  );
  const [deleteModal, setDeleteModal] = React.useState(false);
  const openDeleteModal = (data: VisitorType) => {
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

        const response = await appAxios.get(`/visitor?page=${page}`, {
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
    <AppLayout
      pageTitle='All Visitors'
      pageAction={
        <div className='flex gap-2'>
          <BackButton />
          <Link to='/visitation/add'>
            <Button className='!h-[40px] !p-4 bg-secondary'>Add Visitor</Button>
          </Link>
        </div>
      }
    >
      {loading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {data.map((visitor) => (
              <VisitorCard
                visitor={visitor}
                key={visitor.id}
                openDeleteModal={openDeleteModal}
              />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <span className='text-md'>No visitor found</span>
      )}
      <DeleteVisitorModal
        allData={data}
        setAllData={setData}
        closeModal={closeDeleteModal}
        openModal={deleteModal}
        selectedData={selectedData}
      />
    </AppLayout>
  );
};

export default AllVisitors;
