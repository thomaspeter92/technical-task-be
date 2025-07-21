import React, { forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, onClick, className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        onClick={onClick}
        className={`bg-orange-400 disabled:cursor-not-allowed disabled:bg-slate-200 text-white font-bold text-sm px-8 py-4 rounded-lg hover:bg-orange-300 transition-colors cursor-pointer ${className}`}
      >
        {children}
      </button>
    );
  }
);

export default Button;
