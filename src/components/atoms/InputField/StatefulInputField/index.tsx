import ErrorMessage from "../../ErrorMessage";

const StatefulInputField: React.FC<any> = ({
  label,
  name,
  value,
  type,
  onChange,
  styles,
  id,
  error,
  min,
  max,
  disabled,
  placeholder,
  containerStyles,
}) => {
  return (
    <div className={`${containerStyles} mt-5`}>
      <label className="font-semibold text-sm text-gray-600 pb-1 block">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          id={id}
          min={min}
          max={max}
          disabled={disabled}
          placeholder={placeholder}
          className={`${styles} border rounded-lg dark:text-dark outline-none focus:border-violet-blue duration-200 px-3 py-2 mt-1 text-base w-full`}
          onChange={onChange}
        />
      </div>
      <ErrorMessage field={error} />
    </div>
  );
};

export default StatefulInputField;
