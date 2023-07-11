import React from 'react';
import AppLayout from '../../../layout/AppLayout';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import BackButton from '../../../common/Button/BackButton';
import DeleteLeaderModal from '../../../components/TFCC/DeleteLeaderModal';
import Loader from '../../../common/Loader/Loader';
import LeaderCard from '../../../components/TFCC/LeaderCard';
import { appAxios } from '../../../api/axios';
import { getUserSession } from '../../../functions/userSession';
import { TFCCLeaderType } from '../../../../types/types';
import { sendCatchFeedback } from '../../../functions/feedback';
import Pagination from '../../../common/Pagination';

const TFCCLeaders = () => {
  const [leaderLoading, setLeaderLoading] = React.useState(false);
  const currentUser = getUserSession();
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState<number>(1);
  const [leaders, setLeaders] = React.useState<TFCCLeaderType[] | undefined>([]);
  // delete modal
  const [selectedLeader, setSelectedLeader] = React.useState<TFCCLeaderType | undefined>(
    undefined
  );
  const [leaderDeleteModalOpen, setLeaderDeleteModalOpen] = React.useState(false);
  const openLeaderDeleteModal = (leader: TFCCLeaderType) => {
    setSelectedLeader(leader);
    setLeaderDeleteModalOpen(true);
  };
  const closeLeaderDeleteModal = () => {
    setLeaderDeleteModalOpen(false);
  };

  React.useEffect(() => {
    const getLeaders = async () => {
      try {
        setLeaderLoading(true);

        const response = await appAxios.get(`/tfcc/leader?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setLeaders(response.data.data?.data);
        setTotalResults(response.data.data?.totalResults);

        setLeaderLoading(false);
      } catch (error) {
        setLeaders([]);
        sendCatchFeedback(error);

        setLeaderLoading(false);
      }
    };
    getLeaders();
  }, [page]);
  return (
    <AppLayout
      pageTitle='TFCC Leaders'
      pageAction={
        <div className='flex gap-2'>
          <BackButton />
          <Link to='/tfcc/leader/new'>
            <Button className='!max-w-fit !w-[150px] !h-[40px] !p-4 bg-secondary'>
              Add Leader
            </Button>
          </Link>
        </div>
      }
    >
      {leaderLoading ? (
        <Loader />
      ) : leaders && leaders.length > 0 ? (
        <div>
          {leaders.map((leader) => (
            <LeaderCard
              leader={leader}
              key={leader.id}
              openLeaderDeleteModal={openLeaderDeleteModal}
            />
          ))}
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </div>
      ) : (
        <span className='text-md'>No leader found</span>
      )}
      <DeleteLeaderModal
        allLeaders={leaders}
        setAllLeaders={setLeaders}
        closeDeleteModal={closeLeaderDeleteModal}
        deleteModalOpen={leaderDeleteModalOpen}
        leader={selectedLeader}
      />
    </AppLayout>
  );
};

export default TFCCLeaders;
