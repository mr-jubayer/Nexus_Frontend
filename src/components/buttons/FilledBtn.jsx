/* eslint-disable react/prop-types */

function FilledBtn(
  { children = "button", className = "", onClick = () => {} },
  type = "button"
) {
  return (
    <button
      className={`  py-1 px-3 rounded-md  transition-all duration-150 ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default FilledBtn;
