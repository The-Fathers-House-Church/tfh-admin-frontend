import React from 'react';
import { getUserSession } from '../../../functions/userSession';
import { sendCatchFeedback } from '../../../functions/feedback';
import { appAxios } from '../../../api/axios';
import AppLayout from '../../../layout/AppLayout';
import BackButton from '../../../common/Button/BackButton';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import Loader from '../../../common/Loader/Loader';
import DeleteDepartmentModal from '../../../components/Church/DeleteDepartmentModal';
import DepartmentCard from '../../../components/Church/DepartmentCard';
import { DepartmentType } from '../../../../types/types';

const Departments = () => {
  const [loading, setLoading] = React.useState(false);
  const currentUser = getUserSession();

  const [data, setData] = React.useState<DepartmentType[] | undefined>([]);
  // delete modal
  const [selectedData, setSelectedData] = React.useState<DepartmentType | undefined>(
    undefined
  );
  const [deleteModal, setDeleteModal] = React.useState(false);
  const openDeleteModal = (data: DepartmentType) => {
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

        const response = await appAxios.get(`/department`, {
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
      pageTitle='Church Departments'
      pageAction={
        <div className='flex gap-2'>
          <BackButton />
          <Link to='/church/departments/new'>
            <Button className='!max-w-fit !h-[40px] !p-4 bg-secondary'>
              Add Department
            </Button>
          </Link>
        </div>
      }
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {loading ? (
          <Loader />
        ) : data && data.length > 0 ? (
          data.map((department) => (
            <DepartmentCard
              department={department}
              key={department.id}
              openDeleteModal={openDeleteModal}
            />
          ))
        ) : (
          <span className='text-md'>No department found</span>
        )}
      </div>

      <DeleteDepartmentModal
        allData={data}
        setAllData={setData}
        closeModal={closeDeleteModal}
        openModal={deleteModal}
        selectedData={selectedData}
      />
    </AppLayout>
  );
};

export default Departments;
