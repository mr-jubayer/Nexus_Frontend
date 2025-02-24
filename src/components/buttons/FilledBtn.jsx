/* eslint-disable react/prop-types */

function FilledBtn(
  { children = "button", disabled, className = "", onClick = () => {} },
  type = "button"
) {
  return (
    <button
      className={`  py-1 px-3   transition-all duration-150 ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default FilledBtn;
