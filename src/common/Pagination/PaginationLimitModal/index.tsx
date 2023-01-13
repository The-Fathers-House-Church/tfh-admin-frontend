import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { closeModal, setLimit } from '../../../store/slices/pageLimit';
import CustomModal from '../../CustomModal/CustomModal'
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../LabelInput/LabelInput';
import Button from '../../Button/Button';

function PaginationLimitModal() {
  const { open, limit } = useAppSelector((state) => state.pageLimit)
  const dispatch = useAppDispatch();


  const formik = useFormik({
    initialValues: {
      limit: limit
    },
    onSubmit: () => {
      updateLimit();
    },
    validationSchema: yup.object({
      limit: yup.number().required('Required').min(1, "Limit must not be less than 1"),
    }),
  });

  const updateLimit = () => {
    dispatch(setLimit({ limit: formik.values.limit }))
    dispatch(closeModal())
  }

  return (
    <CustomModal
      modalState={open}
      closeModal={() => dispatch(closeModal())}
      title='Change number of results per page'
    >
      <form onSubmit={formik.handleSubmit}>
        <LabelInput
          formik={formik}
          name='limit'
          label='Limit'
          placeholder='Enter page limit'
          className='mb-10'
        />
        <Button type='submit'>Update Limit</Button>

      </form>

    </CustomModal>
  )
}

export default PaginationLimitModal