import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaUserAlt, FaCrown } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading";

const Statistics = () => {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });
  const axiosSecure = useAxiosSecure();
  const { data: statistics = [] } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users/statistics`);
      return data;
    },
  });

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  return (
    <section className="py-8 bg-green-100/20 text-gray-800 my-16">
      <div className="  text-center">
        {/* Section Header */}
        <Heading title="Our Achievements" />
        {/* Statistics Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-7"
        >
          {/* Total Users */}
          <div className="stat-card group">
            <div className="rounded-full bg-myGreen p-8 inline-block mb-4 transform transition-transform duration-300 group-hover:scale-110">
              <FaUsers className="text-white text-5xl" />
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-2">
              {startCount && (
                <CountUp
                  end={statistics.totalUsers}
                  duration={3}
                  separator=","
                />
              )}
              +
            </h3>
            <p className="text-gray-600">Total Users</p>
          </div>

          {/* Normal Users */}
          <div className="stat-card group">
            <div className="rounded-full bg-myGreen p-8 inline-block mb-4 transform transition-transform duration-300 group-hover:scale-110">
              <FaUserAlt className="text-white text-5xl" />
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-2">
              {startCount && (
                <CountUp
                  end={statistics.normalUsers}
                  duration={3}
                  separator=","
                />
              )}
              +
            </h3>
            <p className="text-gray-600">Normal Users</p>
          </div>

          {/* Premium Users */}
          <div className="stat-card group">
            <div className="rounded-full bg-myGreen p-8 inline-block mb-4 transform transition-transform duration-300 group-hover:scale-110">
              <FaCrown className="text-white text-5xl" />
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-2">
              {startCount && (
                <CountUp
                  end={statistics.premiumUsers}
                  duration={3}
                  separator=","
                />
              )}
              +
            </h3>
            <p className="text-gray-600">Premium Users</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
