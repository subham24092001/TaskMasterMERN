import React, { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  // Function to check if the input is valid, based on pattern if provided
  const isValid = () => {
    if (inputProps.pattern) {
      const pattern = new RegExp(inputProps.pattern);
      return pattern.test(inputProps.value);
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={inputProps.id}
        className="text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={inputProps.id}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`rounded-md border ${focused && !isValid() ? 'border-red-500' : 'border-gray-300'} w-full px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors`}
      />
      {focused && !isValid() && (
        <span className="text-xs text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInput;
