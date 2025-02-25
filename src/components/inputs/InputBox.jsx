/* eslint-disable react/prop-types */
import Input from "./Input";

function InputBox({ children, ...rest }) {
  return (
    <div className="relative">
      <div className="flex flex-col gap-2  dark:text-white/90">
        <label htmlFor={rest?.name}>{rest?.label} </label>
        <Input {...rest} />
      </div>
      {children}
    </div>
  );
}

export default InputBox;
