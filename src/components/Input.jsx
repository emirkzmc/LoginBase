export default function Input({ placeholder,disabled=false, className,name, onChange, typee = "text", showPassword = false, style, required, onFocus, onBlur, value }) {
  const inputType = typee === "password" && showPassword ? "text" : typee;

  return (
    <input
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      style={style}
      required={required}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      name={name}
    />
  );
}
