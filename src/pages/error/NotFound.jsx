import React from "react";
import FilledBtn from "../../components/buttons/FilledBtn";
import { Link } from "react-router";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen xl:h-[700px] flex-col">
      <div className=" flex items-center md:text-[150px] text-6xl">
        <span>4</span>
        <img
          src="https://img.icons8.com/?size=100&id=RaljsbuV3tuS&format=png&color=000000"
          className="md:h-[150px] h-24"
        />
        <span>4</span>
      </div>
      <div>
        <h2 className="text-3xl">Not Found</h2>
      </div>
      <Link to={"/"}>
        {" "}
        <FilledBtn className="bg-error text-white mt-2">
          {" "}
          Back to Home
        </FilledBtn>
      </Link>
    </div>
  );
}

export default NotFound;
