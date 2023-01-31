import React from 'react';
import { appAxios } from '../../api/axios';
import Pagination from '../../common/Pagination';
import TransactionCard from '../../components/Giving/TransactionCard';
import { sendCatchFeedback } from '../../functions/feedback';
import { getUserSession } from '../../functions/userSession';
import AppLayout from '../../layout/AppLayout';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { TransactionType } from '../../../types/types';

function Transaction() {
  const dispatch = useAppDispatch();
  const [transactions, setTransactions] = React.useState<TransactionType[] | undefined>(
    []
  );
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const currentTransaction = getUserSession();

  React.useEffect(() => {
    const getAllTransactions = async () => {
      dispatch(openLoadingIndicator({ text: 'Retrieving Transactions' }));

      try {
        const response = await appAxios.get(`/transaction?page=${page}`, {
          headers: {
            Authorization: currentTransaction ? currentTransaction?.token : null,
          },
        });

        setTransactions(response.data.data?.results);
        setTotalResults(response.data.data?.pagination?.totalResults);
      } catch (error) {
        setTransactions([]);
        sendCatchFeedback(error);
      }
      dispatch(closeLoadingIndicator());
    };
    getAllTransactions();
  }, [page]);

  return (
    <AppLayout pageTitle='Transactions'>
      {transactions && transactions.length ? (
        <>
          <div className='flex flex-col gap-5'>
            {transactions.map((transaction) => (
              <TransactionCard transaction={transaction} key={transaction._id} />
            ))}
          </div>
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </>
      ) : (
        <>No transaction found</>
      )}
    </AppLayout>
  );
}

export default Transaction;
