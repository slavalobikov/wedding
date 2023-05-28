const Input = ({ id = 'input', value, onChange, placeholder, className, type = 'text', name, ...inputProps }) => {
  return (
    <label>
      <input
        id={id}
        name={name}
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...inputProps}
      />
    </label>
  );
};

export default Input;
