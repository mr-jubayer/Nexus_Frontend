/* eslint-disable react/prop-types */

function Input({
  type = "text",
  className = "",
  value = "",
  defaultValue = null,
  onChange,
  name = "input",
  id = "",
  register = {},
  required = false,
}) {
  const inputValue = value ? { value, onChange } : { defaultValue };

  return (
    <input
      type={type}
      className={`block ${className} px-2 py-1 rounded-none w-full focus:outline-none ring-1 ring-black/30 dark:bg-black2 dark:text-white  focus:ring-myGreen focus:shadow-inner `}
      placeholder={name}
      name={name}
      id={id}
      {...inputValue}
      {...register}
      required={required}
    />
  );
}

export default Input;
