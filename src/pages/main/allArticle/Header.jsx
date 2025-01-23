/* eslint-disable react/prop-types */
import { Select } from "@headlessui/react";
import clsx from "clsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Tags } from "../home/addArticle/tags";

function Header({ tagsChangeHandler, pubChangeHandler, searchChangeHandler }) {
  const axiosSecure = useAxiosSecure();

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
    <div className="grid grid-cols-12 border border-myGreen/60 rounded-md py-6 px-4 text-black mb-6 mt-4   gap-4 items-center">
      {/* Publisher Dropdown */}
      <div className="md:block hidden w-full sm:w-auto flex-1 col-span-2">
        <Select
          onChange={pubChangeHandler}
          className={clsx(
            "w-full appearance-none border border-black/30 rounded-md py-2 px-4 text-sm text-black",
            "focus:outline-none focus:ring-1 focus:ring-myGreen"
          )}
        >
          <option value={""}>Search by Publishers</option>
          {publishers.map((pub, i) => (
            <option key={i} value={pub.label}>
              {pub.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Search Input */}
      <div className="w-full sm:flex-1 md:col-span-8 col-span-12">
        <input
          onChange={searchChangeHandler}
          className=" appearance-none border border-black/30 rounded-md py-3 px-4 text-sm text-black focus:outline-none focus:ring-1 w-full focus:ring-myGreen"
          placeholder="Search articles..."
        />
      </div>

      <div className="block md:hidden w-full sm:w-auto flex-1 md:col-span-2 col-span-6">
        <Select
          onChange={pubChangeHandler}
          className={clsx(
            "w-full appearance-none border border-black/30 rounded-md py-2 px-4 text-sm text-black",
            "focus:outline-none focus:ring-1 focus:ring-myGreen"
          )}
        >
          <option value={""}>Search by Publishers</option>
          {publishers.map((pub, i) => (
            <option key={i} value={pub.label}>
              {pub.label}
            </option>
          ))}
        </Select>
      </div>
      {/* Tags Dropdown */}
      <div className="w-full sm:w-auto flex-1 md:col-span-2 col-span-6">
        <Select
          onChange={tagsChangeHandler}
          className={clsx(
            "w-full appearance-none border border-black/30 rounded-md py-2 px-4 text-sm text-black",
            "focus:outline-none focus:ring-1 focus:ring-myGreen"
          )}
        >
          <option value={""}>Search by Tags</option>
          {Tags.map((tag, i) => (
            <option key={i} value={tag.label}>
              {tag.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default Header;
