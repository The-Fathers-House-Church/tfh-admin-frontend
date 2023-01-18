import { useState } from 'react';

interface Props {
	label: string;
	formik?: any;
	name: string;
	className?: string;
	placeholder?: string;
	hint?: string;
	useFormik?: boolean;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
	value?: string | number;
	showError?: boolean;
	error?: string;
	required?: boolean;
	[x: string]: any;
}

function TextArea({
	label = '',
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
						<textarea
							name={name}
							id={name}
							placeholder={placeholder}
							value={formik.values[name]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={formik.touched[name] && formik.errors[name] ? 'inputError' : ''}
							{...rest}
						></textarea>
					</div>

					{formik.touched[name] && formik.errors[name] && (
						<div className='error'>{formik.errors[name]}</div>
					)}
				</>
			) : (
				<div>
					<label
						htmlFor={name}
						className={`dark:text-white ${showError ? 'errorText' : ''}`}
					>
						{label}
					</label>
					{hint && <div className='font-light text-xs italic text-gray-400'>{hint}</div>}
					<div className='relative'>
						<textarea
							name={name}
							id={name}
							placeholder={placeholder}
							value={value}
							onChange={onChange}
							required={required}
							{...rest}
						></textarea>
					</div>

					{showError && <div className='error'>{error}</div>}
				</div>
			)}
		</div>
	);
}

export default TextArea;
