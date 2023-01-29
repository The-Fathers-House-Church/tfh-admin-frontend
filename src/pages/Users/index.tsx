import React from 'react';
import { appAxios } from '../../api/axios';
import Pagination from '../../common/Pagination';
import UserCard from '../../components/Users/UserCard';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { UserType } from '../../types';

function User() {
  const dispatch = useAppDispatch();
  const [users, setUsers] = React.useState<UserType[] | undefined>([]);
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const currentUser = getUserSession();

  React.useEffect(() => {
    const getAllUsers = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Users' }));

      try {
        const response = await appAxios.get(`/user?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setUsers(response.data.data?.results);
        setTotalResults(response.data.data?.pagination?.totalResults);
      } catch (error) {
        setUsers([]);
        sendCatchFeedback(error);
      }
      dispatch(closeLoadingIndicator());
    };
    getAllUsers();
  }, [page]);

  return (
    <AppLayout pageTitle='Users'>
      {users && users.length ? (
        <>
          <div className='flex flex-col gap-5'>
            {users.map((user) => (
              <UserCard user={user} key={user._id} />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <>No user found</>
      )}
    </AppLayout>
  );
}

export default User;
