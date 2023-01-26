import { useState } from 'react';
import { HidePasswordIcon, ShowPasswordIcon } from './PasswordIcons';

interface Props {
  label: string;
  formik?: any;
  type?: string;
  name: string;
  className?: string;
  placeholder?: string;
  hint?: string;
  useFormik?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  showError?: boolean;
  error?: string;
  required?: boolean;
  [x: string]: any;
}

function LabelInput({
  label = '',
  type = 'text',
  formik,
  name,
  className = '',
  placeholder,
  hint,
  useFormik = true,
  onChange,
  value,
  showError = false,
  error,
  required,
  ...rest
}: Props) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordReveal = () => {
    const element: any = document.getElementById(name);
    if (element) {
      if (element.type === 'password') {
        element.type = 'text';
        setPasswordShown(true);
      } else {
        element.type = 'password';
        setPasswordShown(false);
      }
    }
  };

  return (
    <div className={'inputContainer ' + className}>
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
          {hint && <div className='font-light text-xs italic text-gray-400'>{hint}</div>}
          <div className='relative'>
            <input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched[name] && formik.errors[name] ? 'inputError' : ''}
              {...rest}
            />
            {type === 'password' && (
              <div
                className='absolute bottom-3 right-3 cursor-pointer'
                onClick={togglePasswordReveal}
              >
                {passwordShown ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </div>
            )}
          </div>

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
          {hint && <div className='font-light text-xs italic text-gray-400'>{hint}</div>}
          <div className='relative'>
            <input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              {...rest}
            />

            {type === 'password' && (
              <div
                className='absolute bottom-3 right-3 cursor-pointer'
                onClick={togglePasswordReveal}
              >
                {passwordShown ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </div>
            )}
          </div>

          {showError && <div className='error'>{error}</div>}
        </>
      )}
    </div>
  );
}

export default LabelInput;
