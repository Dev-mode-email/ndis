import React from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "@/core/lib/utils";

interface PhoneFieldProps extends Omit<PhoneInputProps, 'inputStyle' | 'buttonStyle'> {
  helperText?: string;
  className?: string;
  error?: boolean;
  required?: boolean;
  size?: 'sm' | 'md';
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneHandler?: (phone: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  inputStyle?: React.CSSProperties;
  name: string;
}

const PhoneField = React.forwardRef<HTMLInputElement, PhoneFieldProps>(({
  helperText,
  className,
  error,
  required,
  size = 'md',
  country = "au",
  onPhoneHandler,
  onChangeHandler,
  onBlur,
  inputStyle,
  name,
  ...rest
}, ref) => {
  const inputHeight = size === 'sm' ? 40 : 56;

  return (
    <div className={cn("w-full phone-input-container", className)}>
      <PhoneInput
        inputProps={{ name }}
        onChange={(phoneNumber, country, e) => {
          onChangeHandler?.(e as React.ChangeEvent<HTMLInputElement>);
          onPhoneHandler?.(phoneNumber);
        }}
        preferredCountries={['au', 'us', 'gb']}
        onBlur={(e) => {
          onBlur?.(e as React.FocusEvent<HTMLInputElement, Element>);
        }}
        inputStyle={{
          height: inputHeight,
          borderRadius: 10,
          minWidth: 0,
          width: "100%",
          border: error ? '2px solid #EF4444' : '1px solid #EAECF0',
          fontSize: '16px',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 500,
          paddingLeft: '48px',
          paddingRight: '12px',
          ...inputStyle,
        }}
        buttonStyle={{
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          border: error ? '2px solid #EF4444' : '1px solid #EAECF0',
          borderRight: 'none',
          backgroundColor: 'white',
          height: inputHeight,
        }}
        country={country}
        {...rest}
      />
      {helperText && (
        <p className={cn("text-sm mt-1", error ? "text-red-500" : "text-gray-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
});

PhoneField.displayName = "PhoneField";

export { PhoneField };

