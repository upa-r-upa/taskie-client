interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  name: string;

  isRequired?: boolean;
  extraText?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  className?: string;
}

const InputField = ({
  label,
  type,
  isRequired,
  value,
  onChange,
  placeholder,
  extraText,
  name,
  className,
}: InputFieldProps) => (
  <label className={`form-control mb-3 ${className}`}>
    <div className="label">
      <span className="label-text">{label}</span>
      {isRequired && (
        <span className="label-text-alt text-primary">* 필수 입력</span>
      )}
    </div>
    <input
      required
      type={type}
      placeholder={placeholder}
      className="input input-bordered"
      value={value}
      onChange={onChange}
      name={name}
    />
    {extraText && (
      <div className="label">
        <span className="label-text-alt">{extraText}</span>
      </div>
    )}
  </label>
);

export default InputField;
