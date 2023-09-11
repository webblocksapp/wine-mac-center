export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  errorMessage,
  ...rest
}) => {
  return (
    <div style={{ paddingBottom: 17 }}>
      <label>{label}</label>
      <input style={{ width: '100%' }} {...rest} />
      {error ? <small style={{ color: 'red' }}>{errorMessage}</small> : <></>}
    </div>
  );
};
