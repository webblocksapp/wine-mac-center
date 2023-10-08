export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  options?: Array<{ value: string; label?: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  errorMessage,
  options,
  ...rest
}) => {
  return (
    <div style={{ paddingBottom: 17 }}>
      <label>{label}</label>
      <select style={{ width: '100%' }} {...rest}>
        <option value="">Select...</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
      {error ? <small style={{ color: 'red' }}>{errorMessage}</small> : <></>}
    </div>
  );
};
