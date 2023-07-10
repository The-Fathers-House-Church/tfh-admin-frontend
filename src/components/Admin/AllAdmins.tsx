import React from 'react';
import { appAxios } from '../../api/axios';
import Loader from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination';
import SectionHeader from '../../common/SectionHeader';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import { AdminType } from '../../../types/types';
import DeactivateAdminModal from './DeactivateAdminModal';
import AdminCard from './AdminCard';
import SuperAdminModal from './SuperAdminModal';
import ActivateModal from './ActivateModal';

function AllAdmins() {
  const [loading, setLoading] = React.useState(false);

  const [admins, setAdmins] = React.useState<AdminType[] | undefined>([]);

  const [totalResults, setTotalResults] = React.useState(0);

  const [page, setPage] = React.useState(1);

  const currentUser = getUserSession();

  const [selectedAdmin, setSelectedAdmin] = React.useState<AdminType | null>(null);

  React.useEffect(() => {
    const getAllAdmins = async () => {
      try {
        setLoading(true);

        const response = await appAxios.get(`/admin?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setAdmins(response.data.data?.data);
        setTotalResults(response.data.data?.totalResults);

        setLoading(false);
      } catch (error) {
        setAdmins([]);
        sendCatchFeedback(error);

        setLoading(false);
      }
    };
    getAllAdmins();
  }, [page]);

  // deactivate modal
  const [deactivateModalOpen, setDeactivateModalOpen] = React.useState(false);
  const openDeactivateModal = (admin: AdminType | null) => {
    setSelectedAdmin(admin);
    setDeactivateModalOpen(true);
  };
  const closeDeactivateModal = () => {
    setDeactivateModalOpen(false);
  };

  // activate modal
  const [activateModalOpen, setActivateModalOpen] = React.useState(false);
  const openActivateModal = (admin: AdminType | null) => {
    setSelectedAdmin(admin);
    setActivateModalOpen(true);
  };
  const closeActivateModal = () => {
    setActivateModalOpen(false);
  };

  // super modal
  const [superModalOpen, setSuperModalOpen] = React.useState(false);
  const openSuperModal = (admin: AdminType | null) => {
    setSelectedAdmin(admin);
    setSuperModalOpen(true);
  };
  const closeSuperModal = () => {
    setSuperModalOpen(false);
  };

  return (
    <div className='mt-10'>
      {loading ? (
        <Loader />
      ) : admins && admins?.length > 0 ? (
        <>
          <div className='flex flex-col gap-5'>
            {admins?.map((admin) => (
              <AdminCard
                key={admin.id}
                admin={admin}
                openDeactivateModal={openDeactivateModal}
                openSuperModal={openSuperModal}
                openActivateModal={openActivateModal}
              />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <span className='text-md'>No admin found</span>
      )}

      <DeactivateAdminModal
        closeDeactivateModal={closeDeactivateModal}
        deactivateModalOpen={deactivateModalOpen}
        admin={selectedAdmin}
        setAllAdmins={setAdmins}
        allAdmins={admins}
      />
      <ActivateModal
        closeActivateModal={closeActivateModal}
        activateModalOpen={activateModalOpen}
        admin={selectedAdmin}
        setAllAdmins={setAdmins}
        allAdmins={admins}
      />
      <SuperAdminModal
        closeSuperModal={closeSuperModal}
        superModalOpen={superModalOpen}
        admin={selectedAdmin}
        setAllAdmins={setAdmins}
        allAdmins={admins}
      />
    </div>
  );
}

export default AllAdmins;
