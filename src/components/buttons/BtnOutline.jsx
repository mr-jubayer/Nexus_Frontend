/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

function BtnOutline(
  { children = "button outline", className = "", onClick = () => {} },
  type = "button"
) {
  return (
    <button
      className={`${className}  py-1 px-3 rounded-md `}
      onClick={onclick}
      type={type}
    >
      {children}
    </button>
  );
}

export default BtnOutline;
