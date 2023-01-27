import React from 'react';

function Button({
  className,
  type = 'button',
  onClick,
  style,
  children,
}: {
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      className={
        'bg-primary text-white h-[30px] md:h-[50px] p-5 rounded-md w-full font-medium text-md flex items-center justify-center hover:brightness-110 duration-500 ' +
        className
      }
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
