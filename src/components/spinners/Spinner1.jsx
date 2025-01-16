import { ImSpinner9 } from "react-icons/im";

export default function Spinner1() {
  return (
    <div className="h-[600px] w-full flex justify-center items-center">
      <span>
        <ImSpinner9 className="animate-spin duration-100 text-4xl " />
      </span>
    </div>
  );
}
