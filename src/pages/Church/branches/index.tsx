import React from 'react';
import { getUserSession } from '../../../functions/userSession';
import { sendCatchFeedback } from '../../../functions/feedback';
import { appAxios } from '../../../api/axios';
import AppLayout from '../../../layout/AppLayout';
import BackButton from '../../../common/Button/BackButton';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import Loader from '../../../common/Loader/Loader';
import DeleteBranchModal from '../../../components/Church/DeleteBranchModal';
import BranchCard from '../../../components/Church/BranchCard';
import { ChurchType } from '../../../../types/types';

const Branches = () => {
  const [loading, setLoading] = React.useState(false);
  const currentUser = getUserSession();

  const [data, setData] = React.useState<ChurchType[] | undefined>([]);
  // delete modal
  const [selectedData, setSelectedData] = React.useState<ChurchType | undefined>(
    undefined
  );
  const [deleteModal, setDeleteModal] = React.useState(false);
  const openDeleteModal = (data: ChurchType) => {
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

        const response = await appAxios.get(`/church`, {
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
      pageTitle='Church Branches'
      pageAction={
        <div className='flex gap-2'>
          <BackButton />
          <Link to='/church/branches/new'>
            <Button className='!h-[40px] !p-4 bg-secondary'>Add Branch</Button>
          </Link>
        </div>
      }
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {loading ? (
          <Loader />
        ) : data && data.length > 0 ? (
          data.map((branch) => (
            <BranchCard
              branch={branch}
              key={branch.church_id}
              openDeleteModal={openDeleteModal}
            />
          ))
        ) : (
          <span className='text-md'>No branch found</span>
        )}
      </div>

      <DeleteBranchModal
        allData={data}
        setAllData={setData}
        closeModal={closeDeleteModal}
        openModal={deleteModal}
        selectedData={selectedData}
      />
    </AppLayout>
  );
};

export default Branches;
