/* eslint-disable react/prop-types */
import { Select } from "@headlessui/react";
import clsx from "clsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Tags } from "../home/addArticle/tags";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineSortAscending } from "react-icons/hi";
import { HiOutlineSortDescending } from "react-icons/hi";
import { useState } from "react";
import { RiArrowDropUpLine } from "react-icons/ri";

function Header({
  tagsChangeHandler,
  pubChangeHandler,
  searchChangeHandler,
  setFilter,
  filter,
}) {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/publisher`);
      return data;
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div>
        <h2 className="text-4xl text-center font-semibold  dark:text-darkHeading">
          Explore 100+ Free & Premium Articles
        </h2>
        <p className="text-lg text-[#424242] md:w-7/12 mx-auto text-center mt-2 dark:text-whiteGray">
          Explore a wealth of information. Access 100+ free news articles and
          dive into the stories shaping today's world
        </p>
      </div>
      <div className=" mt-8 text-black mb-6   gap-4 ">
        <div className="my-5 max-w-[800px] mx-auto">
          <div className="flex shadow-sm items-center md:px-5 px-3 bg-myGreen/5 dark:bg-slate-200/5">
            <div className="relative border-r-2">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="dark:text-darkHeading  md:w-auto w-full  md:px-3 px-1   transition-all duration-150 list-none cursor-pointer flex gap-1 items-center md:text-base text-sm    justify-center"
              >
                Sort
                {isOpen ? (
                  <RiArrowDropUpLine size={30} />
                ) : (
                  <RiArrowDropDownLine size={30} />
                )}
              </button>
              <div
                className={` flex-col absolute top-10 p-3 left-0 bg-white shadow-md gap-3  ${isOpen ? "flex" : "hidden"}`}
              >
                <button
                  onClick={() => {
                    setFilter({ ...filter, sortBy: "descen" });
                    setIsOpen(false);
                  }}
                  className="border p-1 flex gap-2 justify-center items-center"
                >
                  Popular <HiOutlineSortDescending />
                </button>
                <button
                  onClick={() => {
                    setFilter({ ...filter, sortBy: "ascen" });
                    setIsOpen(false);
                  }}
                  className="border p-1 flex gap-2 justify-center items-center"
                >
                  Unpopular <HiOutlineSortAscending />{" "}
                </button>
              </div>
            </div>
            <input
              onChange={searchChangeHandler}
              className="bg-transparent   md:h-full md:py-5 py-3 md:px-6 px-3 md:text-2xl text-base text-black  dark:text-whiteGray w-full outline-none"
              placeholder="Search for articles..."
            />
          </div>
        </div>
        {/* others sorting functionality (with - tags | with - publishers) */}
        <div className="flex justify-center gap-2 text-sm mb-12">
          <p className="dark:text-whiteGray">Also Search by: </p>
          {/* publisher s */}
          <div>
            <Select
              onChange={pubChangeHandler}
              className={clsx(
                " text-black font-medium  dark:bg-black1 dark:text-darkHeading cursor-pointer",
                "focus:outline-none white"
              )}
            >
              <option value={""}>Publishers</option>
              {publishers.map((pub, i) => (
                <option className="text-whiteGray" key={i} value={pub.label}>
                  {pub.label}
                </option>
              ))}
            </Select>
          </div>
          |{/* Tags Dropdown */}
          <div>
            <Select
              onChange={tagsChangeHandler}
              className={clsx(
                " text-black font-medium  dark:bg-black1 dark:text-darkHeading cursor-pointer",
                "focus:outline-none white"
              )}
            >
              <option value={""}>Tags</option>
              {Tags.map((tag, i) => (
                <option className="text-whiteGray" key={i} value={tag.label}>
                  {tag.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
