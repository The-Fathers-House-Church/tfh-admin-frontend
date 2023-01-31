import { Dispatch, SetStateAction, useCallback } from 'react';
import LabelInput from '../../common/LabelInput/LabelInput';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { FiPlusSquare, FiTrash } from 'react-icons/fi';
import { RegistrationDetailType } from '../../../types/types';
import Dropdown from '../../common/Dropdown/Dropdown';
import TextArea from '../../common/TextArea/TextArea';

const allowedDetailTypes = ['text', 'number', 'dropdown', 'email', 'tel', 'date', 'url'];

function RequiredRegistrationDetails({
  registrationDetails,
  setRegistrationDetails,
}: {
  registrationDetails: RegistrationDetailType;
  setRegistrationDetails: Dispatch<SetStateAction<RegistrationDetailType>>;
}) {
  const addRegistrationDetail = () => {
    const randomID = uuidv4();

    setRegistrationDetails({
      ...registrationDetails,
      [randomID]: {
        id: randomID,
        name: '',
        type: 'text',
        options: '',
      },
    });
  };

  const removeRegistrationDetail = useCallback(
    (id: string) => {
      // Used a new object variable and set state so the component rerenders
      const newObject = registrationDetails;
      delete newObject[id];

      setRegistrationDetails({
        ...newObject,
      });
    },
    [registrationDetails, setRegistrationDetails]
  );

  const changeInputValue = ({
    id,
    type,
    value,
  }: {
    id: string;
    type: string;
    value: string;
  }) => {
    setRegistrationDetails({
      ...registrationDetails,
      [id]: {
        ...registrationDetails[id],
        [type]: value,
      },
    });
  };

  return (
    <div className='mb-5 mt-5 pt-2 pb-2 border-t-[1px] border-t-lightGrey border-b-[1px] border-b-lightGrey'>
      <div className='flex flex-row flex-wrap gap-5 items-center justify-between mb-2'>
        <p className='font-bold  dark:text-white'>Registration Details</p>
        <div className='flex flex-row flex-wrap gap-5 items-center'>
          <button
            className='text-blue-700 dark:text-blue-400 underline cursor-pointer'
            onClick={addRegistrationDetail}
            type='button'
          >
            <FiPlusSquare />
          </button>
        </div>
      </div>
      {Object.keys(registrationDetails)?.length ? (
        Object.values(registrationDetails)?.map((detail, index) => (
          <div key={detail.id}>
            <div className='flex items-center mt-5 mb-5 text-primary gap-2'>
              <button
                className='text-blue-700 dark:text-blue-400 underline cursor-pointer'
                onClick={() => removeRegistrationDetail(detail.id)}
                type='button'
              >
                <FiTrash className='text-gray-400' />
              </button>
              <span className='font-bold'>Detail {index + 1}</span>
            </div>
            <div className='grid grid-flow-row md:grid-flow-col gap-5'>
              <LabelInput
                useFormik={false}
                name={'name' + index}
                label='Detail Name'
                className='mb-5'
                placeholder='Example: First Name'
                value={registrationDetails[detail.id]?.name}
                onChange={(e) =>
                  changeInputValue({
                    id: detail.id,
                    type: 'name',
                    value: e.target.value,
                  })
                }
                showError={detail.name === ''}
                error='Required'
              />
              <Dropdown
                values={allowedDetailTypes.map((type) => ({
                  label: type,
                  value: type,
                }))}
                label='Detail Type'
                name={'type' + index}
                defaultValue={{
                  label: registrationDetails[detail.id]?.type,
                  value: registrationDetails[detail.id]?.type,
                }}
                useFormik={false}
                className='mb-5'
                onChange={(e) =>
                  changeInputValue({
                    id: detail.id,
                    type: 'type',
                    value: e?.value,
                  })
                }
                showError={detail?.type === '' || !detail?.type}
                error='Required'
                containerStyle={{
                  margin: 0,
                }}
              />
            </div>
            {detail.type === 'dropdown' && (
              <TextArea
                useFormik={false}
                name={'options' + index}
                label='Dropdown Options'
                className='mb-5'
                placeholder='Add options for the dropdown'
                value={registrationDetails[detail.id]?.options}
                hint='Separate items by a comma'
                onChange={(e) =>
                  changeInputValue({
                    id: detail.id,
                    type: 'options',
                    value: e.target.value,
                  })
                }
                showError={detail?.options?.toString() === ''}
                error='Required'
              />
            )}
          </div>
        ))
      ) : (
        <span className='text-gray-600 text-sm'>
          No detail added. Details are required when registration is allowed
        </span>
      )}
    </div>
  );
}

export default RequiredRegistrationDetails;
