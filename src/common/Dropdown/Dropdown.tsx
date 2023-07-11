import Select from 'react-select';

function Dropdown({
  containerStyle = {},
  values,
  isMulti = false,
  formik,
  label,
  name,
  placeholder = 'Enter Value',
  useFormik = true,
  className = '',
  onChange,
  showError,
  error,
  ...props
}: {
  containerStyle?: React.CSSProperties;
  values: { label: string; value: string | boolean | number }[];
  isMulti?: boolean;
  formik?: any;
  label: string;
  name: string;
  placeholder?: string;
  showError?: boolean;
  error?: string;
  useFormik?: boolean;
  onChange?: (e: any) => void;
  className?: string;
  [x: string]: any;
}) {
  return (
    <div className={'w-full flex flex-col gap-[5px] ' + className}>
      {useFormik ? (
        <>
          <label
            htmlFor={name}
            className={`dark:text-white ${
              formik.touched[name] && formik.errors[name] ? 'errorText' : ''
            }`}
          >
            {label}
          </label>

          <Select
            options={values.map((value) => ({
              label: value.label,
              value: value.value,
            }))}
            onChange={(e: any) => {
              formik.setFieldValue(name, e ? e.value : undefined);
            }}
            onBlur={() => {
              formik.setFieldTouched(name, true);
            }}
            id={name}
            styles={{
              container: (provided, state) => ({
                ...provided,
                width: '100%',
                color: '#000',
                ...containerStyle,
              }),
              control: (provided, state) => ({
                ...provided,
                paddingBlock: 6,
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#999',
              }),
            }}
            isClearable
            placeholder={placeholder}
            escapeClearsValue
            backspaceRemovesValue
            noOptionsMessage={() => 'No option found at the moment'}
            isMulti={isMulti}
            {...props}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div className='error'>{formik.errors[name]}</div>
          )}
        </>
      ) : (
        <>
          <label
            htmlFor={name}
            className={`dark:text-white ${showError ? 'errorText' : ''}`}
          >
            {label}
          </label>

          <Select
            options={values.map((value) => ({
              label: value.label,
              value: value.value,
            }))}
            onChange={onChange}
            id={name}
            styles={{
              container: (provided, state) => ({
                ...provided,
                width: '100%',
                color: '#000',
                ...containerStyle,
              }),
              control: (provided, state) => ({
                ...provided,
                paddingBlock: 6,
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#999',
              }),
            }}
            isClearable
            placeholder={placeholder}
            escapeClearsValue
            backspaceRemovesValue
            noOptionsMessage={() => 'No option found at the moment'}
            isMulti={isMulti}
            {...props}
          />
          {showError && <div className='error'>{error}</div>}
        </>
      )}
    </div>
  );
}

export default Dropdown;
