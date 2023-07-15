import React from 'react';
import Loader from '../../../common/Loader/Loader';
import AppLayout from '../../../layout/AppLayout';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import BackButton from '../../../common/Button/BackButton';
import { TFCCCellType } from '../../../../types/types';
import CellCard from '../../../components/TFCC/CellCard';
import DeleteCellModal from '../../../components/TFCC/DeleteCellModal';
import { getUserSession } from '../../../functions/userSession';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback } from '../../../functions/feedback';
import Pagination from '../../../common/Pagination';

const TFCCCells = () => {
  const [cellLoading, setCellLoading] = React.useState(false);
  const [cells, setCells] = React.useState<TFCCCellType[] | undefined>([]);
  const [totalResults, setTotalResults] = React.useState(0);
  const [page, setPage] = React.useState<number>(1);
  // delete modal
  const [selectedCell, setSelectedCell] = React.useState<TFCCCellType | undefined>(
    undefined
  );
  const [cellDeleteModalOpen, setCellDeleteModalOpen] = React.useState(false);
  const openCellDeleteModal = (cell: TFCCCellType) => {
    setSelectedCell(cell);
    setCellDeleteModalOpen(true);
  };
  const closeCellDeleteModal = () => {
    setCellDeleteModalOpen(false);
  };

  const currentUser = getUserSession();
  React.useEffect(() => {
    const getCells = async () => {
      try {
        setCellLoading(true);
        const response = await appAxios.get(`/tfcc/cells?page=${page}`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });
        setCells(response.data.data?.data);
        setTotalResults(response.data.data?.totalResults);
        setCellLoading(false);
      } catch (error) {
        setCells([]);
        sendCatchFeedback(error);
        setCellLoading(false);
      }
    };
    getCells();
  }, [page]);
  return (
    <AppLayout
      pageTitle='TFCC Cells'
      pageAction={
        <div className='flex gap-2'>
          <BackButton />
          <Link to='/tfcc/cell/new'>
            <Button className='max-w-max !h-[40px] !w-[120px] !p-4'>Add Cell</Button>
          </Link>
        </div>
      }
    >
      {cellLoading ? (
        <Loader />
      ) : cells && cells.length > 0 ? (
        <div>
          {cells.map((cell) => (
            <CellCard
              cell={cell}
              key={cell.cell_id}
              openCellDeleteModal={openCellDeleteModal}
            />
          ))}
          <Pagination page={page} totalResults={totalResults} setPage={setPage} />
        </div>
      ) : (
        <span className='text-md'>No cell found</span>
      )}
      <DeleteCellModal
        allCells={cells}
        setAllCells={setCells}
        closeDeleteModal={closeCellDeleteModal}
        deleteModalOpen={cellDeleteModalOpen}
        cell={selectedCell}
      />
    </AppLayout>
  );
};

export default TFCCCells;
