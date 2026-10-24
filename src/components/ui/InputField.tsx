import React from 'react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

/**
 * Pieza reciclable: Campo de entrada de texto accesible con soporte de icono y validación.
 */
export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  icon,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-display font-semibold text-[#5C4332] mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B08259]">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-2xl bg-white border-2 px-4 py-3 text-[#5C4332] placeholder-[#B08259]/60 transition-colors focus:outline-none ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-rose-400 focus:border-rose-500'
              : 'border-[#E6D3C1] focus:border-[#72B6F6]'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-semibold text-rose-600">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-[#7D614D]">{helperText}</p>}
    </div>
  );
};

export interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

/**
 * Pieza reciclable: Campo de texto multilínea estilizado.
 */
export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      <label
        htmlFor={textareaId}
        className="block text-sm font-display font-semibold text-[#5C4332] mb-1.5"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`w-full rounded-2xl bg-white border-2 px-4 py-3 text-[#5C4332] placeholder-[#B08259]/60 transition-colors focus:outline-none ${
          error
            ? 'border-rose-400 focus:border-rose-500'
            : 'border-[#E6D3C1] focus:border-[#FF94B8]'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
};
