/* eslint-disable react/prop-types */

function BtnOutline(
  { children = "button outline", className = "", onClick = () => {} },
  type = "button"
) {
  return (
    <button
      className={`${className}  py-1 px-3  border-myGreen border`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default BtnOutline;
