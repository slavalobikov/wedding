const Input = ({ value, onChange, placeholder, className, type = 'text', name }) => {
  return (
    <label>
      <input
        name={name}
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
